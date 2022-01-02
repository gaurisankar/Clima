
const button = document.getElementById('submit');
const ext = document.getElementById('extent');
const areaData= document.getElementById('area');
const api = " https://global-warming.org/api/arctic-api";

//button
button.addEventListener('click',function(){
    const yearInp = document.getElementById("year").value;
    console.log(yearInp)
    fetch(api)
    .then(function(response){
        let val = response.json();
       console.log(val)
        return val;
        
    })
    .then(function(data){
        console.log(data);
        var a = data.result;
        console.log(a);
        var index=0;
        var found;
        var entry;
        for(index=0;index <a.length ; ++index){
            entry = a[index];
            if(entry.year==yearInp){
                console.log("YOOOO")
                found = entry;
                 ext.innerHTML = found.extent;
                  areaData.innerHTML=found.area;
                console.log(found.extent,found.area)
                break;
            }
            else{
                ext.innerHTML= "Data Available for years 1979-2019 only"
                areaData.innerHTML="..."
            }
           
        }
        
     
    })
})

//Cahr
