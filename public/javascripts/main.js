let auctionItemArray = [];
let selectedType = "";

// define a constructor to create movie objects
let auctionItem = function (pTitle, pArtist, pYear, pPrice, pType) {
    this.title = pTitle;
    this.artist = pArtist;
    this.year = pYear;
    this.price = pPrice;
    this.type = pType;
}



document.addEventListener("DOMContentLoaded", function (event) {

    document.getElementById("buttonAdd").addEventListener("click", function () {

        auctionItemArray.push(new auctionItem(document.getElementById("artTitle").value, document.getElementById("artist").value, document.getElementById("artYear").value, document.getElementById("artPrice").value, selectedType));
        console.log(auctionItemArray);
        document.getElementById("artTitle").value = "";
        document.getElementById("artist").value = "";
        document.getElementById("artYear").value = "";
        document.getElementById("artPrice").value = "";
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });

    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#list", function (event) {   
        createList();
    });
    

});



function createList() {
    
    // clear prior data
    $.get('/GetAllData', function(data, status) {
        auctionItemArray = data;

        var myul = document.getElementById("myList");
    myul.innerHTML = '';

    auctionItemArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = "$" + element.price + " Art type: " + element.type + " <cite>" + element.title + "</cite>, created by Artist: " + element.artist + " in year " + element.year;
        myul.appendChild(li);
    });
    })
};

