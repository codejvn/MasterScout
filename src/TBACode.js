let requestKey = "Pn2U0B82snfZHX1U0cXXsOufa55oSIKECcQjrsa9I5s2IYsmnM61xgZ0aHjRXyXr";
// ioKvRmO6eJ1XLTmvYzkM1WOVmBp1NuaDuLhIvHjE1tVcnxW3YnVJTdsxFZl2VRpG
// pvSd9BH7iZrK5eDp3as26054atw0wUuixGR8zNwUoctFuQdZL08pRJuwd7pHGP9l
var headers = {
    "X-TBA-Auth-Key" : "Pn2U0B82snfZHX1U0cXXsOufa55oSIKECcQjrsa9I5s2IYsmnM61xgZ0aHjRXyXr"
  };
    
var options = {
"headers" : headers
};

let requestTBA = (rKey) => {
  let link = "https://www.thebluealliance.com/api/v3" + rKey;
  return fetch(link,options);
}
export default requestTBA;