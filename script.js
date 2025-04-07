function setNominal(value) {
  document.getElementById('nominalInput').value = value;
}

async function konfirmasi() {
  const input = document.getElementById('nominalInput').value.trim();
  const nominal = parseInt(input);

  if (isNaN(nominal) || nominal < 1000) {
    alert("Masukkan nominal yang valid (min 1000)");
    return;
  }

  document.getElementById('loader').style.display = 'flex';

  const url = `https://simpelz.fahriofficial.my.id/api/orkut/createpayment?apikey=new2025&amount=${nominal}&odeqr=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214510229091161840303UMI51440014ID.CO.QRIS.WWW0215ID20243618424440303UMI5204541153033605802ID5920NUSS STORE OK21236766009MOJOKERTO61056131162070703A0163049B4C`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.result || !data.result.qrImageUrl || !data.result.expirationTime || data.result.qrImageUrl === '') {
      alert("Gagal mendapatkan data QR. Coba lagi.");
      document.getElementById('loader').style.display = 'none';
      return;
    }

    document.getElementById('qrImage').src = data.result.qrImageUrl;
    document.getElementById('expired').textContent = `Expired: ${data.result.expirationTime}`;
    document.getElementById('result').style.display = 'flex';
  } catch (error) {
    alert("Terjadi kesalahan saat memproses!");
    console.error("ERROR:", error);
  } finally {
    document.getElementById('loader').style.display = 'none';
  }
}
