
export default{
    // 加法
    numAdd(num1,num2){
        let baseNum,baseNum1,baseNum2
        try {
            baseNum1 = num1.toString().split('.')[1].length;
        } catch (error) {
            
        }
        try{
            baseNum2 = num2.toString().split('.')[1].length
        }catch(error){
            
        }
        baseNum = Math.pow(10,Math.max(baseNum1,baseNum2))
        return (num1 * baseNum + num2 * baseNum) / baseNum
    },
    // 减法
    numSub(num1,num2){
       let baseNum,baseNum1,baseNum2,precision
       try{
        // 截取小数点后面的位数
        baseNum1 = num1.toString().split('.')[1].length;
       }catch(error){

       }
       try{
           // 截取小数点后面的位数
        baseNum2 = num2.toString().split('.')[1].length;
       }catch(error){

       }
    //    查看两个数谁的小数点后面的长度比较大，在乘以10的大数的幂
       baseNum = Math.pow(10,Math.max(baseNum1,baseNum2))
    //    保留几位小数
       precision = baseNum1 >= baseNum2 ? baseNum1 : baseNum2

       return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision)
    },

    // 乘法
    numMulti(num1,num2){
        let baseNum = 0;
        try {
            baseNum += num1.toString().split('.')[1].length;
        } catch (error) {
            
        }
        try {
            baseNum += num2.toString().split('.')[1].length;
        } catch (error) {
            
        }
        return (
            num1.toString().replace('.','') 
            * 
            num2.toString().replace('.','')
        ) / Math.pow(10,baseNum)
    },
    // 除法
    numDiv(num1,num2){
        let baseNum1,baseNum2,baseNum3,baseNum4
        try{
            baseNum1 = num1.toString().split('.')[1].length
        }catch(error){

        }
        try{
            baseNum2 = num2.toString().split('.')[1].length
        }catch(error){

        }
        baseNum3 = num1.toString().replace('.','')
        baseNum4 = num2.toString().replace('.','')
        return (baseNum3 / baseNum4) * Math.pow(10,baseNum2 - baseNum1)
    },
    formatDate(val, type = 1) {
        if (!val) {
            return '--'
        }
        if (val === 0) {
            return '--'
        }
        let result = ''
        let date = new Date(parseInt(val))
        let year = date.getFullYear()
        let month = this.pad(date.getMonth() + 1)
        let day = this.pad(date.getDate())
        let housrs = this.pad(date.getHours())
        let minutes = this.pad(date.getMinutes())
        let seconds = this.pad(date.getSeconds())
        switch (type) {
            case 1:
                result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
                break
            case 2:
                result = month + '-' + day + ' ' + housrs + ':' + minutes
                break
            case 3:
                result = year + '-' + month + '-' + day
                break
            case 4:
                result = minutes + ':' + seconds
                break
            case 5:
                result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes
                break
            case 6:
                result = housrs + ':' + minutes + ':' + seconds
                break
            default:
                result = year + '-' + month + '-' + day + ' ' + housrs + ':' + minutes + ':' + seconds
                break
        }
        return result
    },
    pad(num) {
        return new Array(2 - ('' + num).length + 1).join(0) + num
    }
}