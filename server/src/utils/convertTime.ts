export default function convertTime (time:string){
    
    const hour =Math.floor(Number(time)/60)
    const minutes = Number(time)%60;
    
    const doubleDigit = new Intl.NumberFormat('pt-br', {minimumIntegerDigits:2})
    return doubleDigit.format(hour) + ":" + doubleDigit.format(minutes); 
}