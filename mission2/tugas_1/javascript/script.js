class Barang {
  constructor(id, nama, harga, imagePath) {
    this.id = id;
    this.nama = nama;
    this.harga = harga;
    this.imagePath = imagePath;
    this.kuantitas = 1;
    this.subtotal = harga;
  }

  tambahKuantitas() {
    this.kuantitas += 1;
    this.updateSubtotal();
  }

  kurangiKuantitas() {
    this.kuantitas -= 1;
    this.updateSubtotal();
  }

  updateSubtotal() {
    this.subtotal = this.harga * this.kuantitas;
  }

  showBarang() {
    const parent = document.getElementById("katalog");
    const child = document.createElement("section");
    child.setAttribute("id", this.id);
    child.setAttribute("class", "border-2 flex flex-col m-5 p-1 hover:shadow-2xl");
    child.innerHTML = `
      <img src="${this.imagePath}" alt="" />
      <div class="p-5">
        <h3 class="mb-1 text-2xl font-['Source_Serif_Pro']">${this.nama}</h3>
        <p class="">Rp. ${this.harga.toLocaleString('id-ID')}</p>
      </div>
      <button class="mt-auto bg-slate-900 mx-5 my-5 text-white py-2 w-auto text-lg border border-slate-700 hover:bg-white hover:text-slate-900" onclick="keranjang.addBarang(${this.id})">TAMBAH BARANG</button>
      `;
    parent.appendChild(child);
  }
}

class Keranjang {
  constructor() {
    this.listBarang = [];
    this.totalHarga = 0;
    this.pajak = 0;
    this.totalBayar = 0;
  }

  addBarang(barang) {
    if (!this.listBarang.includes(barang)) {
      this.listBarang.push(barang);
      this.updateKeranjang();
    }
  }

  hitungTotalHarga() {
    this.totalHarga = 0;
    for (let i = 0; i < this.listBarang.length; i++) {
      this.totalHarga += this.listBarang[i].subtotal;
    }
  }

  hitungPajak() {
    this.pajak = this.totalHarga * 0.11;
  }

  showBarang(barang) {
    const parent = document.getElementById("keranjang");
    const child = document.createElement("div");
    child.setAttribute("id", barang.id + "Cart");
    child.setAttribute("class", "flex flex-col sm:flex-row sm:justify-between border-b pb-4");
    child.innerHTML = `
    <div class="flex flex-row">
      <img src="${barang.imagePath}" alt="gambar ${barang.nama}"  width="100px" />
      <div class="space-y-2 ps-5">
        <h4 class="text-xl font-['Source_Serif_Pro']">${barang.nama}</h4>
        <p class="text-sm font-medium">Rp. ${barang.harga.toLocaleString('id-ID')}</p>
        <div class="flex flex-row flex-nowrap space-x-1 justify-start my-2" >
          <button type="button" disabled class="bg-slate-800 w-6 text-white border border-slate-700 hover:bg-white hover:text-slate-800 disabled:bg-slate-500 disabled:text-white" onclick="keranjang.kurangiKuantitas(${barang.id})">-</button>
          <input class="border border-black text-center w-16 pl-2" type="number" value="1" onkeydown="if (event.key === 'Enter') keranjang.setKuantitas(${barang.id})"/>
          <button type="button" class="bg-slate-900 w-6 text-white  border border-slate-700 hover:bg-white hover:text-slate-800" onclick="keranjang.tambahKuantitas(${barang.id})">+</button>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-between">
      <button class="self-end" onclick="keranjang.remove(${barang.id})">
        <svg class="hover:stroke-red-500" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.09h-4.95v-.1A3.025 3.025 0 1 0 9 5v.1H4a1 1 0 0 0 0 2h1v13A1.84 1.84 0 0 0 6.92 22h10.16A1.9 1.9 0 0 0 19 20.09V7.1h1a1 1 0 1 0 0-2v-.01zM11 5a1 1 0 0 1 2 0v.1h-2V5zM7 20V7.1h10V20H7zm3-2a1 1 0 0 0 1-1v-6.9a1 1 0 0 0-2 0V17a1 1 0 0 0 1 1zm4.767-.293A1 1 0 0 1 13.06 17v-6.9a1 1 0 1 1 2 0V17a1 1 0 0 1-.293.707z" fill="#8D96AA"/></svg>
      </button>
      <h3 class="ms-auto self-end">Rp. ${barang.subtotal.toLocaleString('id-ID')}</h3>
    </div>
    `;
    parent.appendChild(child);
  }

  remove(barang) {
    const index = this.listBarang.indexOf(barang);
    this.listBarang.splice(index, 1);
    document.getElementById(barang.id + "Cart").remove();

    if (this.listBarang.length == 0) {
      document.getElementById("detailPembayaran").remove();
      console.log("kosong");
    }

    this.updateKeranjang();
  }

  setKuantitas(barang) {
    const input = document.getElementById(barang.id + "Cart").getElementsByTagName('input')[0];
    if (input.value >= 0) {
      barang.kuantitas = parseInt(input.value);
      barang.updateSubtotal();
      this.updateKeranjang();
    }
  }

  kurangiKuantitas(barang) {
    if (barang.kuantitas > 1) {
      barang.kurangiKuantitas();
      this.updateKeranjang();
    }
  }

  tambahKuantitas(barang) {
    barang.tambahKuantitas();
    this.updateKeranjang();
  }

  updateBarang(barang) {
    if (barang.kuantitas == 1) {
      document.getElementById(barang.id + "Cart").getElementsByTagName('button')[0].disabled = true;
    } else {
      document.getElementById(barang.id + "Cart").getElementsByTagName('button')[0].disabled = false;
    }
    document.getElementById(barang.id + "Cart").getElementsByTagName('input')[0].value = barang.kuantitas;
    document.getElementById(barang.id + "Cart").getElementsByTagName('h3')[0].innerHTML = "Rp. " + barang.subtotal.toLocaleString('id-ID');
    barang.updateSubtotal();
  }

  showPembayaran() {
    const parent = document.getElementById("pembayaran");
    const child = document.createElement("div");
    child.setAttribute("id", "detailPembayaran");
    child.setAttribute("class", "flex flex-col justify-end mr-12 mt-4");
    child.innerHTML = `
    <div class="flex flex-row justify-end">
      <div class="font-bold flex-auto">
        <ol>
          <li>Total Pembelian</li>
          <li>Pajak 11%</li>
          <li>Total Bayar</li>
        </ol>
      </div>
      <div class="font-bold">
        <ol>
          <li id="totalPembelian">Rp. ${this.totalHarga.toLocaleString('id-ID')}</li>
          <li id="pajak">Rp. ${this.pajak.toLocaleString('id-ID')}</li>
          <li id="totalBayar">Rp. ${this.totalBayar.toLocaleString('id-ID')}</li>
        </ol>
      </div>
    </div>

    <div class="flex justify-center xl:justify-start">
      <button class="mt-5 bg-slate-900 text-white py-2 px-4 max-sm:w-full sm:w-1/2 text-lg border border-slate-700 hover:bg-white hover:text-slate-900" onclick="keranjang.buatStruk()">BAYAR</button>
    </div>
      `;
    parent.appendChild(child);
  }

  updatePembayaran() {
    document.getElementById("totalPembelian").innerHTML = "Rp. " + this.totalHarga.toLocaleString('id-ID');
    document.getElementById("pajak").innerHTML = "Rp. " + this.pajak.toLocaleString('id-ID');
    document.getElementById("totalBayar").innerHTML = "Rp. " + this.totalBayar.toLocaleString('id-ID');
  }

  updateKeranjang() {
    this.listBarang.forEach(barang => {
      if (document.getElementById(barang.id + "Cart") == null) {
        this.showBarang(barang);
      } else {
        this.updateBarang(barang);
      }
    });

    this.hitungTotalHarga();
    this.hitungPajak();
    this.totalBayar = this.totalHarga + this.pajak;

    const pembayaran = document.getElementById("pembayaran");

    if (pembayaran.hasChildNodes()) {
      this.updatePembayaran();
    } else if (this.listBarang.length > 0) {
      this.showPembayaran();
    }
  }

  buatStruk() {
    const parent = document.getElementsByTagName("main")[0];
    const child = document.createElement("div");
    child.setAttribute("id", "struk");
    child.setAttribute("class", "h-screen w-screen bg-[rgba(0,0,0,0.85)] z-10 fixed flex justify-center");
    child.setAttribute("onclick", "document.getElementById('struk').remove()");
    child.innerHTML = `
    <div class="flex flex-col bg-white max-w-xl h-full p-5 my-4 z-20 text-sm">
      <div class="flex flex-row justify-between">
        <h3 class="font-bold">ICASHIER</h3>
        <h3>INVOICE</h3>
      </div>

      <div class="flex flex-col mt-5">
       <p>
        Order ID : A12EL91
        <br>Tanggal : ${new Date().toLocaleDateString('id-ID')}
       </p>
      </div>

      <table class="mt-5 border-t-2 border-b-2 border-separate border-spacing-4">
        <thead>
          <tr>
            <th class="text-left">Nama Barang</th>
            <th class="text-left">Harga</th>
            <th class="text-right">Qty</th>
            <th class="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody class="text-xs">
          ${this.listBarang.map(barang => {
      return `
              <tr>
                <td>${barang.nama}</td>
                <td class="text-left">Rp. ${barang.harga.toLocaleString('id-ID')}</td>
                <td class="text-right">${barang.kuantitas}</td>
                <td class="text-right">Rp. ${barang.subtotal.toLocaleString('id-ID')}</td>
              </tr>
              `;
    }).join('')}
        </tbody>
      </table>

      <div class="grid grid-cols-3 mt-5 font-medium">
        <div></div>
        <div class="flex flex-col">
          <p>Total Pembelian</p>
          <p>Pajak 11%</p>
          <p>Total Bayar</p>
        </div>
        <div class="flex flex-col items-end">
          <p>Rp. ${this.totalHarga.toLocaleString('id-ID')}</p>
          <p>Rp. ${this.pajak.toLocaleString('id-ID')}</p>
          <p>Rp. ${this.totalBayar.toLocaleString('id-ID')}</p>
        </div>
      </div>

    </div>
    `;
    parent.appendChild(child);
  }
}

const barang1 = new Barang("barang1", "MacBook Air M1 (2020)", 12999000, "assets/macbook_air_m1.jpg");
const barang2 = new Barang("barang2", "Mac Studio (2022)", 33999000, "assets/mac_studio.jpg")
const barang3 = new Barang("barang3", "MacBook Pro 13'(M2)", 19499000, "assets/macbook_pro_13_m2.jpg")
const barang4 = new Barang("barang4", "iPhone 14 Pro", 17999000, "assets/iphone_14_pro.jpg")
const barang5 = new Barang("barang5", "MacBook Pro 14'(M1)", 26999000, "assets/macbook_pro_14_m1.jpg")
const barang6 = new Barang("barang6", "iMac (M1)", 21999000, "assets/imac_m1.jpg")
const barang7 = new Barang("barang7", "Mac mini M1 (2020)", 11999000, "assets/mac_mini_m1.jpg")
const barang8 = new Barang("barang8", "iPad Pro (Gen-6)", 14999000, "assets/ipad_pro_gen6.jpg")
const barang9 = new Barang("barang9", "MacBook Pro M1 (2020)", 16499000, "assets/macbook_pro_13_m1.jpg")

const listBarang = [barang1, barang2, barang3, barang4, barang5, barang6, barang7, barang8, barang9];
listBarang.forEach(barang => {
  barang.showBarang();
});

const keranjang = new Keranjang();