let itemCount = 0;
let totalAmount = 0;

function hoverItem(element) {
    element.style.border = "2px solid #007bff";
}

function removeHover(element) {
    if (!element.classList.contains("selected")) {
        element.style.border = "1px solid #ccc";
    }
}

function selectItem(element, itemName, itemPrice) {
    if (!element.classList.contains("selected")) {
        element.classList.add("selected");
        itemCount += 1;
        totalAmount += itemPrice;
    } else {
        element.classList.remove("selected");
        itemCount -= 1;
        totalAmount -= itemPrice;
    }
    updateOrderSummary();
}

function updateOrderSummary() {
    document.getElementById("item-count").innerText = itemCount;
    document.getElementById("total-amount").innerText = totalAmount;

    
    document.getElementById("order-section").style.display = itemCount > 0 ? "block" : "none";
}

function placeOrder() {
    alert("Order placed successfully!");
    
    document.querySelectorAll(".menu-item").forEach(item => item.classList.remove("selected"));
    itemCount = 0;
    totalAmount = 0;
    updateOrderSummary();
}

function cancelOrder() {
    
    document.getElementById("item-count").innerText = "0";
    document.getElementById("total-amount").innerText = "0";
    
    
    document.getElementById("order-section").style.display = "none";
    
    
    alert("Order has been canceled.");
}
