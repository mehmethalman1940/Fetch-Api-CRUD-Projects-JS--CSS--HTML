const editButton = document.querySelector(".primary");
const addButton  = document.getElementById("addButton");
const newName = document.getElementById("name");

function get() {
    fetch('https://66eaa9ff55ad32cda479e532.mockapi.io/products') // API'den ürün verilerini çek
      .then(response => response.json()) // Yanıtı JSON formatına çevir
      .then(data => {
        const nameList = document.getElementById('nameList'); // HTML'deki nameList elemanını seç
        let content = ''; // Boş bir string oluştur
        data.forEach(item => { // Her bir ürün için döngü oluştur
          content += `<div class="user-item">
            <p>
              <i class="fas fa-user"></i>
              <span id"spanName">User :</span> ${item.name} <!-- Dizi içindeki her bir nesnenin name özelliği -->
            </p>
            <div class="buttons">
              <button class="primary"> <!-- item.id'yi parametre olarak gönder -->
                <i class="fas fa-edit"></i>
                Edit
              </button>
              <button class="danger" onclick="deleteProduct(${item.id})"> <!-- item.id'yi parametre olarak gönder -->
                <i class="fas fa-trash"></i>
                Delete
              </button>
            </div>
          </div>`;
        });
        nameList.innerHTML = content; // Tüm öğeleri HTML'e yaz
      })
      .catch(error => console.error('Hata:', error)); // Hata varsa yakala ve yazdır
  }
 get();

 function deleteProduct(id) {
    fetch(`https://66eaa9ff55ad32cda479e532.mockapi.io/products/${id}`, {
        method: 'DELETE' // HTTP metodunu DELETE olarak belirtiyoruz
    })
    .then(response => response.json()) // Yanıtı JSON formatına çeviriyoruz
    .then(data => {
        console.log(`Ürün ${id} silindi:`, data); // Başarılı şekilde silindiğinde mesajı yazdır
        get(); // Listeyi yeniden çekmek için get fonksiyonunu çağır
    })
    .catch(error => console.error('Silme hatası:', error)); // Hata varsa yazdır
}


addButton.addEventListener("click",(e) =>{
    e.preventDefault();

        fetch('https://66eaa9ff55ad32cda479e532.mockapi.io/products', {
            method: 'POST', // HTTP metodunu POST olarak belirtiyoruz
            headers: {
                'Content-Type': 'application/json' // Gönderilen verinin JSON formatında olduğunu belirtiyoruz
            },
            body: JSON.stringify({
                name: newName.value,
            }) // Gönderilecek veriyi JSON formatına çevirip body'ye ekliyoruz
        })
        .then(response => response.json()) // Yanıtı JSON formatına çeviriyoruz
        .then(data => {
            console.log('Yeni ürün oluşturuldu:', data); // Başarılı olursa yanıtı konsola yazdır
            get();
        })
        .catch(error => console.error('Ürün oluşturma hatası:', error)); // Hata varsa konsola yazdır
   

        newName.value="";
    
})
 

function update(id, updatedData) {
    fetch(`https://66eaa9ff55ad32cda479e532.mockapi.io/products/${id}`, {
        method: 'PUT', // HTTP metodunu PUT olarak belirtiyoruz
        headers: {
            'Content-Type': 'application/json' // Gönderilen verinin JSON formatında olduğunu belirtiyoruz
        },
        body: JSON.stringify(updatedData) // Gönderilen güncellenmiş veriyi JSON formatına çevirip body'ye ekliyoruz
    })
    .then(response => response.json()) // Yanıtı JSON formatına çeviriyoruz
    .then(data => {
        console.log('Ürün güncellendi:', data); // Güncellenen veriyi konsola yazdır
    })
    .catch(error => console.error('Güncelleme hatası:', error)); // Hata varsa konsola yazdır
}



document.querySelector('.primary').addEventListener('click', function() {
    // spanName ID'sine sahip elementi seç
    const spanElement = document.getElementById('spanName');

    // Yeni bir input elemanı oluştur
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'text'); // input tipini text olarak ayarla
    inputElement.setAttribute('id', 'newName'); // id'sini newName olarak ayarla
    inputElement.setAttribute('placeholder', 'update'); // placeholder değerini ayarla

    // Oluşturulan input elemanını span etiketinin altına ekle
    spanElement.appendChild(inputElement);
    
});






