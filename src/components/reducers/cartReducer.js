import Item1 from '../../images/item1.jpg'
import Item2 from '../../images/item2.jpg'
import Item3 from '../../images/item3.jpg'
import Item4 from '../../images/item4.jpg'
import Item5 from '../../images/item5.jpg'
import Item6 from '../../images/item6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'apple', desc: "AirPods with Charging Case.More magical than ever.The new AirPods combine intelligent design with breakthrough technology and crystal clear sound. Powered by the new Apple H1 headphone chip, AirPods now feature hands-free access to Siri using just your voice. And up to 3 hours of talk time on a single charge.", price:149,img:Item1},
        {id:2,title:'sony', desc: "Identifies and filters out distracting environmental noise such as jet engines. A built-in microphone lets you talk hands-free. A water-resistant design so you can take it to more places—perfect for sports. Adjust your music or answer calls with these models with built-in controls.", price:120,img: Item2},
        {id:3,title:'philips', desc:"They fit securely in your ears, and the compact charging case lets you enjoy music for up to 12 hours",price:48,img: Item3},
        {id:4,title:'samsung', desc: "SAMSUNG Galaxy Buds True Wireless Bluetooth Headset (Black, True Wireless) With these Samsung Galaxy earbuds, you can walk, run, jog, and dance without having them fall out of your ears - thanks to their snug fit. They also feature a slim design that allows you to carry them along with you no matter where you go.", price:59,img:Item4},
        {id:5,title:'creative', desc: "Representing wireless freedom and unmatchable performance, the Outlier Air is our first TWS headphones in the series. Boasting a playtime of up to 30 hours, a 5.6mm superior graphene driver diaphragm and Bluetooth® 5.0 with aptX and AAC audio, the Outlier Air impresses with detailed and immersive audio reproduction.", price:119,img: Item5},
        {id:6,title:'zebronics', desc: "Zeb-Sound Bomb is a wireless earphone that comes with freedom from wires. The earphones are super compact and come with a snug fit on the ears with features like touch controls, a voice assistant for android/ IOS devices, call function, splashproof design, and has up to 18 hours of battery life with the charging case",price:29,img: Item6}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer