var musteriler = [];
var musteriVerileri = localStorage.getItem("musteriler");
if (musteriVerileri != null) {
  musteriler = JSON.parse(musteriVerileri);
}

var suankiMusteri = null;

function musteriyiGoster() {
  document.getElementById("musteri_adi").innerText =
    suankiMusteri.ad + " " + suankiMusteri.soyad;
  document.getElementById("hesaptaki_para").innerText = suankiMusteri.bakiye;
  document.getElementById("bankamatik").style.display = "block";
  document.getElementById("baslik").style.display = "none";
}

document.getElementById("musteri_parolasini_goster").onmousedown = function () {
  document.getElementById("musteri_parola").type = "text";
};

document.getElementById("musteri_parolasini_goster").onmouseup = function () {
  document.getElementById("musteri_parola").type = "password";
};

document.getElementById("musteri_geri").onclick = function () {
  document.getElementById("musteri_paneli").style.display = "none";
  document.getElementById("baslik").style.display = "block";
};

document.getElementById("musteri_girisi").onclick = function () {
  document.getElementById("musteri_no").value = "";
  document.getElementById("musteri_parola").value = "";
  document.getElementById("baslik").style.display = "none";
  document.getElementById("musteri_paneli").style.display = "block";

  document.getElementById("musteri_no").focus();
};

document.getElementById("musteri_bilgileri_dogrula").onclick = function () {
  var kartNumarasi = document.getElementById("musteri_no").value;
  var bulunanMusteri = musteriler.find(
    (musteri) => musteri.musteriNo == kartNumarasi
  );
  if (bulunanMusteri) {
    var parola = document.getElementById("musteri_parola").value;
    if (parola == bulunanMusteri.parola) {
      suankiMusteri = bulunanMusteri;
      document.getElementById("baslik").style.display = "none";
      document.getElementById("musteri_paneli").style.display = "none";
      musteriyiGoster();
    } else {
      alert("Kart şifrenizi yanlış girdiniz.");
    }
  } else {
    alert("Bankamız müşterisi değilsiniz.");
  }
};

document.getElementById("karti_cikar").onclick = function () {
  document.getElementById("musteri_adi").innerText = "";
  suankiMusteri = null;
  document.getElementById("hesaptaki_para").innerText = 0;
  document.getElementById("bankamatik").style.display = "none";
  document.getElementById("baslik").style.display = "block";
};

function paraCek(tutar) {
  if (suankiMusteri.bakiye - tutar < 0) {
    alert("Hesabınızdaki tutar yeterli değil.");
  } else {
    suankiMusteri.bakiye = suankiMusteri.bakiye - tutar;
    var musteriVerileri = JSON.stringify(musteriler);
    localStorage.setItem("musteriler", musteriVerileri);
    document.getElementById("hesaptaki_para").innerText = suankiMusteri.bakiye;
  }
}

document.getElementById("para_cek_20").onclick = function () {
  paraCek(20);
};
document.getElementById("para_cek_50").onclick = function () {
  paraCek(50);
};
document.getElementById("para_cek_100").onclick = function () {
  paraCek(100);
};
document.getElementById("para_cek_250").onclick = function () {
  paraCek(250);
};
document.getElementById("para_cek_500").onclick = function () {
  paraCek(500);
};

document.getElementById("para_cek_tutar").onclick = function () {
  var girilenTutar = prompt("Lütfen istediğiniz tutarı girin.");
  if (girilenTutar < 0) {
    alert("Girmiş olduğunuz tutar, geçerli bir tutar değil.");
  } else {
    paraCek(girilenTutar);
  }
};
