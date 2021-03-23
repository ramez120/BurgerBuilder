export const updateObject = (oldObject,updatedProperties) =>{
    return {
        ...oldObject,
        ...updatedProperties

    }
}
export const checkValidity = (value, vaildationRules) => {
    let isValid = true;
    if (vaildationRules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (vaildationRules.maxLength) {
      isValid = value.length <= vaildationRules.maxLength && isValid;
    }
    if (vaildationRules.minLength) {
      isValid = value.length >= vaildationRules.minLength && isValid;
    }
    return isValid;
  };