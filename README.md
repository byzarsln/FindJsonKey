# Find Json Key Value

## Genel Bakış
Bu kod input değerine yazılan değeri run ederek JSON dosyasının içerisinde arar ve altındaki değerleri döndürür.

#### Projenin çalışabilmesi için:  
1. `cd` komutu ile projenin içerisine giriyoruz.  
2. `npm install` ile node modules ekliyoruz.  
3. Ardından `npm run dev` komutu ile projemizi çalıştırılabilir hale getiriyoruz.  


## Başlangıç
Öncelikle React ile projeyi geliştireceğimden daha hızlı işlem yapmamı ve yaptığım işlemin çıktısını daha hızlı almamı sağlayan Vite ile projeyi create ettim.

Ardından JSON dosyamı public dosyamın içerisine yerleştirdim. Bu dosyayı okuyabilmek için iki izleyeceğim iki yöntem vardı:
1. import ederek işleme sokmak
2. axios.get ile işleme sokmak

Daha kapsamlı projelerde ve dış kaynaklara ulaşımda axios kullanıldığından import etmek yerine axios kullanımını tercih ettim. 

## Kod

Burada elimde tutmam gereken 3 veri var:
1. input a girilen değer
2. json değeri
3. text areada yazılacak değer

Bunlar üzerinde işlem yapacağımdan bu değerleri tanımlayıp useState() ile değerleri üzerinde işlem yapabiliyorum. Başlangıç değerlerine null atıyorum:

```javascript
const [inputValue, setInputValue] = useState("")
const [jsonValue, setJsonValue] = useState(null)
const [textAreaValue, setTextAreaValue] = useState("")
```
---

## Axios

Burada axios ile veriyi çekme işlemine başlıyorum. Bu işlem asenkron bir işlem olduğu için kodumuzda `async` ve bunun karşılığı olarak `await` kullanıyoruz. Get ile veriyi aldıktan sonra json değerimize aldığımız veriyi atıyoruz:

```javascript
const findValue = async () => {
  try {
    const response = await axios.get("/pet3.json");
    setJsonValue(response.data);
  } catch (error) {
    console.error("Error");
  }
}
```
---

## useEffect():
useEffect() ise bileşen yüklendiğinde json verimizi çektiğimiz fonksiyonumuzun çalışmasını sağlıyor.
```javascript
  useEffect(() => {
    findValue()
  }, [])
```
---

## handleInput

Burada inputa girilen değeri işliyoruz. Öncelikle kodda `preventDefault` ile formun varsayılan gönderme işlemini, sayfayı yenilemesini engelliyoruz. Ardından girilen değeri `.` ya göre split ediyoruz. Bu sayede her bir bileşeni tek tek elimizde array halinde tutabiliyoruz. 

### Reduce
Split ettiğimiz değerleri `reduce` ile key üzerinden kullanarak aşama aşama yığılımlı olarak doğru veriye erişebiliyoruz. Başlangıç `acc` (accumulator) değerine `jsonValue` vererek işlemi `jsonValue` üzerinden ilerletiyoruz. Ardından keyimiz ile `jsonValue`’nun verdiğimiz key dizinine gidiyoruz. Burada bulunduğumuz konum artık yeni `acc`, yeni gelen key ise bunun altında arayacağımız dizin olur. Bu şekilde yığılımlı olarak sürekli aşama aşama dizinleri gezerek doğru değere ulaşabiliyoruz. Ardından bulduğumuz değeri JSON formatında yazabilmek için kodumuzu da yazıyoruz.

```javascript
const handleInput = (e) => {
  e.preventDefault();
  const result = inputValue.split(".").reduce((acc, key) => acc[key], jsonValue);
  setTextAreaValue(JSON.stringify(result, null, 2));
}
```
---

Son olarak form işlemimizde sürekli yapması için handleInput fonksiyonunu çağırıyoruz. Input ve textArea’ya değerlerimizi jsx formtıyla {inputValue} şeklinde veriyoruz. 

Input kısmına girilen verileri yani değişiklikleri işleyebilmek için :
```javascript
value={inputValue}
          onChange = {(e) => setInputValue(e.target.value)}
```

Kodunu işliyoruz. Burada input a bir şey girildiğinde bir değişim olduğunda bunu tutup değerimize atama işlemini yapıyoruz. 

En son olarak CSS ile şekillendirmelerimizi yaptıktan sonra kodumuzu tamamlıyoruz.
