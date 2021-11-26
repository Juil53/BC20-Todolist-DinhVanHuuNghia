const isLoading = false;
const loading = document.getElementsByClassName("loading")[0];
const checkLoading = () => {
    if(isLoading = true){
        document.getElementsByTagName("body")[0].append(loading);
    }
    document.getElementsByTagName("body")[0].remove(loading);
}
export default checkLoading;