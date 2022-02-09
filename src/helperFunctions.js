//alphabatizes category names in dropdown
function sortAlpha (propName) {
    return propName.sort((a,b) => {
        const value1 = a.categoryName.toLowerCase()
        const value2 = b.categoryName.toLowerCase()
        if (value1 < value2) {
            return -1
        } 
        if (value1 > value2) {
            return 1
        }
        return 0
    })    
}

//changes user input to title case 
function toTitleCase (str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
};

//checks length of user input and alerts if characters exceed max length
function maxUserInput(userInput, minlength, maxlength) {       
    if (userInput.length >= minlength && userInput.length <= maxlength) {  	
        return userInput;  	
    } else {  	
	    console.log("Text has exceeded the maximum characters allowed");          	
    }  
}

//checks if a selected option from drop down box is a defaultValue 
function defaultCtgyNames(word) {
    return word.includes("- none -") || word.includes("-- Select Category --")
}

//filters chosen option to find match, then maps over it and returns category id
function getCatgyId(ctgyList, ctgyName) {
    const list = ctgyList.filter(c => {
        return c.categoryName === ctgyName
    })
    const id = list.map(c => {
        return c.id
    })
    return id[0]
}

export {sortAlpha, toTitleCase, maxUserInput, defaultCtgyNames, getCatgyId}









  