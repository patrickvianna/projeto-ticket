angular.module('myApp').factory('gridSystem', [ function() {

    function toCssClasses(numbers) {
        const cols = numbers ? numbers.split(' ') : []
        let classes = ''

        if(cols[0]) classes += `col-xs-offset-${cols[0]}`
        if(cols[1]) classes += `col-xs-${cols[1]}`
        if(cols[2]) classes += `col-md-offset-${cols[2]}`
        if(cols[3]) classes += `col-md-${cols[3]}`
        
        return classes
    }

    return { toCssClasses }
}])