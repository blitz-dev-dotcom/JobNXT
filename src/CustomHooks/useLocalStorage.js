export function useLocalStorage(key){
    const setItem = (value)=>{
        window.localStorage.setItem(key,value);
    }
    
    
    return {setItem }
}