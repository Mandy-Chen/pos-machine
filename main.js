function printReceipt(barcodes) {
    //有效的购物车商品信息
    var shopCart = ValidItems(barcodes, allItems());
    //去重
    var duplicateRemovalItems = duplicateRemoval(shopCart);
    //加次数和每个商品的总价
    var itemDetails = QuantityItems(duplicateRemovalItems, shopCart);
    //打印商品信息
    var PrintItemsMsg = printItemsMsg(itemDetails);
    //计算总价
    var total = totalPrice(itemDetails);
    var head="\n***<store earning no money>Receipt ***\n";
    var middle="----------------------\n";
    var bottom="**********************";
    var receipt=head+PrintItemsMsg+middle+total+bottom;
    return receipt;
}
//所有的商品详情
function allItems() {
    var arr = [
        {
            barcode: 'ITEM000000',
            name: 'Coca-Cola',
            price: 3
        },
        {
            barcode: 'ITEM000001',
            name: 'Sprite',
            price: 3
        },
        {
            barcode: 'ITEM000002',
            name: 'Apple',
            price: 5
        },
        {
            barcode: 'ITEM000003',
            name: 'Litchi',
            price: 15
        },
        {
            barcode: 'ITEM000004',
            name: 'Battery',
            price: 2
        },
        {
            barcode: 'ITEM000005',
            name: 'Instant Noodles',
            price: 4
        }
    ];
    return arr;
}
//判断购物车的商品信息是否存在于数据文件，存在则push到shopCart
function ValidItems(barcodes, allItems) {
    var shop_cart = [];
    barcodes.forEach(function (barcode) {
        allItems.forEach(function (allitem) {
            if (allitem.barcode == barcode) {
                shop_cart.push(allitem);
            }
        })
    })
    return shop_cart;

}
//去重
function duplicateRemoval(shopCart) {
    var duplicateRemovalItems = [];
    for (var i = 0; i < shopCart.length; i++) {
        if (duplicateRemovalItems.indexOf(shopCart[i]) == -1) {
            duplicateRemovalItems.push(shopCart[i]);
        }
    }
    return duplicateRemovalItems;
}
//商品次数
function QuantityItems(duplicateRemovalItems, shopCart) {
    var ItemDetails = [];
    for (let i = 0; i < duplicateRemovalItems.length; i++) {
        const element = duplicateRemovalItems[i];
        var count = 0;
        for (let j = 0; j < shopCart.length; j++) {
            if (element.barcode == shopCart[j].barcode) {
                count++;
            }
        }
        ItemDetails.push({ name: element.name, quantity: count, price: element.price, total: count * element.price });
    }
    return ItemDetails;
}
//打印商品信息
function printItemsMsg(itemDetails) {
    var str = '';
    for (let i = 0; i < itemDetails.length; i++) {
        const element = itemDetails[i];
        str += "Name: " + element.name + ", Quantity: " + element.quantity +", Unit price: "+element.price+" (yuan), Subtotal: " + element.total + " (yuan)\n";
    }
    return str;
}
//计算总价
function totalPrice(itemDetails) {
    let total = 0;
    for (let i = 0; i < itemDetails.length; i++) {
        const element = itemDetails[i];
        total+=element.total;

    }
    str="Total: "+total+" (yuan)\n";
    return str;
}
module.exports = {
    printReceipt
};