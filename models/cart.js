module.exports = function Cart(oldCart){
    this.items= oldCart.items || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;
    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem){
        storedItem = this.items[id] = {item:item,qty:0,price:0};
        }
        storedItem.qty++;
        storedItem.price = ((storedItem.item.price*100)*storedItem.qty) /100;
        this.totalQty++;
        this.totalPrice = (this.totalPrice *100 + storedItem.item.price *100) /100;
    };
    this.reduceByOne=function(id){
        this.items[id].qty--;
        this.items[id].price = (this.items[id].price *100 - this.items[id].item.price*100)/100;
        this.totalQty--;
        this.totalPrice = (this.totalPrice *100 - this.items[id].item.price *100) /100;
        if(this.items[id].qty<=0){
        delete this.items[id];
        }
    };
    this.removeItem = function(id){
        this.totalQty -=this.items[id].qty;
        this.totalPrice =(this.totalPrice *100 - this.items[id].price *100) /100;
        delete this.items[id];
    };
    this.generateArray = function(){
        var arr = [];
        for(var id in this.items){
        arr.push(this.items[id]);
        }
        return arr;
    };
};