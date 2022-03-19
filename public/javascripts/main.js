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

        let AuctionObject = new auctionItem(document.getElementById("artTitle").value, document.getElementById("artist").value, document.getElementById("artYear").value, document.getElementById("artPrice").value, selectedType);
        auctionItemArray.push(AuctionObject);

        $.ajax({
            url: '/postData',
            type: 'POST',
            data: JSON.stringify(AuctionObject),
            contentType: "application/json; charset=utf-8",
    
            success: function (result) {
                alert(result + " posted");
    
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }

            
        });

        document.getElementById("artTitle").value = "";
        document.getElementById("artist").value = "";
        document.getElementById("artYear").value = "";
        document.getElementById("artPrice").value = "";
        
    });

    $(document).bind("change", "#select-type", function (event, ui) {
        selectedType = document.getElementById("select-type").value;
    });

    document.getElementById("buttonDelete").addEventListener("click", function () {
        let dataToDelete = localStorage.getItem("title");

        $.ajax({
            url: '/deleteData/' + dataToDelete,
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
    
            success: function (result) {
                alert(result + " deleted");
    
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
            
        });

    });


    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#list", function (event) {   
        createList();
    });

    $(document).on("pagebeforeshow", "#details", function (event) {   
        let AuctionItemTitle = localStorage.getItem("title");
        let AuctionItemType = localStorage.getItem("type");
        let AuctionItemArtist = localStorage.getItem("artist");
        let AuctionItemPrice = localStorage.getItem("price");
        let AuctionItemYear = localStorage.getItem("year");
        document.getElementById("Title").innerHTML = AuctionItemTitle;
        document.getElementById("Type").innerHTML = AuctionItemType;
        document.getElementById("Artist").innerHTML = AuctionItemArtist;
        document.getElementById("Price").innerHTML = AuctionItemPrice;
        document.getElementById("Year").innerHTML = AuctionItemYear;
    });
    

});



function createList() {
    
    // clear prior data
    $.get('/GetAllData', function(data, status) {
        auctionItemArray = data;
        console.log("Downloaded from server: " + data);
        var myul = document.getElementById("myList");
    myul.innerHTML = '';

    auctionItemArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.classList.add("AuctionList");
        console.log("ForEach element: " + element);
        li.innerHTML = "Art type: " + element.type + " <cite>" + element.title + "</cite>, created by Artist: " + element.artist;
        li.setAttribute("attr-price", element.price);
        li.setAttribute("attr-type", element.type);
        li.setAttribute("attr-title", element.title);
        li.setAttribute("attr-artist", element.artist);
        li.setAttribute("attr-year", element.year);
        myul.appendChild(li);
    });

    var auctionElements = document.getElementsByClassName("AuctionList");
    var auctionElementArray = Array.from(auctionElements);
    auctionElementArray.forEach(function(element,i) {
        element.addEventListener('click', function() {
            alert("Clicked on list # " + (i+1));
            var price = this.getAttribute("attr-price");
            var type = this.getAttribute("attr-type");
            var title = this.getAttribute("attr-title");
            var artist = this.getAttribute("attr-artist");
            var year = this.getAttribute("attr-year");
            localStorage.setItem("price", price);
            localStorage.setItem("type", type);
            localStorage.setItem("title", title);
            localStorage.setItem("artist", artist);
            localStorage.setItem("year", year);
            document.location.href = "index.html#details";
        });
    });

    })
};

