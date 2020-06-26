document.getElementById("yonetici_girisi").onclick = function () {
  document.getElementById("baslik").style.display = "none";
  document.getElementById("yonetici_paneli").style.display = "block";
};

document.getElementById("yonetici_geri").onclick = function () {
  document.getElementById("yonetici_paneli").style.display = "none";
  document.getElementById("baslik").style.display = "block";
};

document.getElementById("yonetici_islemleri_cikis").onclick = function () {
  document.getElementById("yonetici_paneli").style.display = "block";
  document.getElementById("yonetici_islemleri").style.display = "none";
};

document.getElementById("yonetici_bilgileri_dogrula").onclick = function () {
  var kullaniciAdi = document.getElementById("kullanici_adi").value;
  var kullaniciParola = document.getElementById("kullanici_parola").value;

  if (kullaniciAdi == "admin" && kullaniciParola == "admin") {
    yoneticiBolumunuGoster();
  } else {
    alert("Parolanız yanlış!");
  }
};

document.getElementById("yeni_musteri").onclick = function () {
  // Müşteri ekleme işlemleri
  var musteriNo = prompt("Lütfen müşteri no giriniz.");
  if (!musteriNo) {
    return;
  }
  var varolanMusteri = musteriler.find(
    (musteri) => musteri.musteriNo == musteriNo
  );
  if (varolanMusteri) {
    alert("Bu müşteri numarası kullanılıyor!");
  } else {
    var musteriAdi = prompt("Lütfen müşteri adını giriniz.");
    if (!musteriAdi) {
      alert("Müşteri Adı zorunlu!");
      return;
    }
    var musteriSoyad = prompt("Lütfen müşteri soyadını giriniz.");
    if (!musteriSoyad) {
      alert("Müşteri Soyadı zorunlu!");
      return;
    }
    var musteriBakiye = parseInt(prompt("Lütfen müşteri bakiyesini giriniz."));
    if (!musteriBakiye) {
      musteriBakiye = 0;
    }
    var musteriParola = prompt("Lütfen müşterinin parolasını giriniz.");
    var musteri = {
      ad: musteriAdi,
      soyad: musteriSoyad,
      musteriNo: musteriNo,
      bakiye: musteriBakiye,
      parola: musteriParola,
      silindi: false,
    };
    musteriler.push(musteri);
    musterileriKaydet();
    musterileriListele();
  }
};
function musterileriKaydet() {
  var musteriVerileri = JSON.stringify(musteriler);
  localStorage.setItem("musteriler", musteriVerileri);
}

function yoneticiBolumunuGoster() {
  document.getElementById("yonetici_paneli").style.display = "none";
  document.getElementById("yonetici_islemleri").style.display = "block";

  musterileriListele();
}

function musterileriListele() {
  document.getElementById("musteri_sayisi").innerText = musteriler.length;
  document.querySelector("#musteri_tablosu tbody").innerHTML = null;
  for (const musteri of musteriler) {
    var trMusteri = document.createElement("tr");
    var tdIslem = document.createElement("td");
    var tdAd = document.createElement("td");
    var tdSoyad = document.createElement("td");
    var tdMusteriNo = document.createElement("td");
    var tdBakiye = document.createElement("td");

    var btnSil = document.createElement("button");
    btnSil.innerText = "Sil";
    btnSil.className = "sil-butonu";

    btnSil.onclick = function () {
      var onay = confirm("Müşteriyi silmek istediğinizden emin misiniz?");
      if (onay == true) {
        musteriler = musteriler.filter((m) => m.musteriNo != musteri.musteriNo);
        musterileriKaydet();
        musterileriListele();
      }
    };

    tdIslem.append(btnSil);

    var btnDuzenle = document.createElement("button");
    btnDuzenle.innerText = "Düzenle";
    btnDuzenle.className = "duzenle-butonu";

    btnDuzenle.onclick = function () {
      var mevcutMusteri = musteriler.find(
        (m) => m.musteriNo == musteri.musteriNo
      );

      var musteriAdi = prompt(
        "Lütfen müşteri adını giriniz.",
        mevcutMusteri.ad
      );
      if (!musteriAdi) {
        alert("Müşteri Adı zorunlu!");
        return;
      }
      var musteriSoyad = prompt(
        "Lütfen müşteri soyadını giriniz.",
        mevcutMusteri.soyad
      );
      if (!musteriSoyad) {
        alert("Müşteri Soyadı zorunlu!");
        return;
      }
      var musteriBakiye = parseInt(
        prompt("Lütfen müşteri bakiyesini giriniz.", mevcutMusteri.bakiye)
      );
      if (!musteriBakiye) {
        musteriBakiye = 0;
      }
      var musteriParola = prompt(
        "Lütfen müşterinin parolasını giriniz.",
        mevcutMusteri.parola
      );
      mevcutMusteri.ad = musteriAdi;
      mevcutMusteri.soyad = musteriSoyad;
      mevcutMusteri.bakiye = musteriBakiye;
      mevcutMusteri.parola = musteriParola;
      musterileriKaydet();
      musterileriListele();
    };

    tdIslem.append(btnDuzenle);

    tdAd.innerText = musteri.ad;
    tdSoyad.innerText = musteri.soyad;
    tdMusteriNo.innerText = musteri.musteriNo;
    tdBakiye.innerText = musteri.bakiye;

    trMusteri.append(tdIslem);
    trMusteri.append(tdAd);
    trMusteri.append(tdSoyad);
    trMusteri.append(tdMusteriNo);
    trMusteri.append(tdBakiye);
    document.querySelector("#musteri_tablosu tbody").append(trMusteri);
  }
}
