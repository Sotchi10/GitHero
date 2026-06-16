

const DashIconContainer = ({ type="button", item }) => {
    return(
        <>
            <button type="button" className="w-7.5 h-7.5 rounded-[5px] p-1 border border-default cursor-pointer">
                <img src={item} alt="" />
            </button>
        </>
    );
}
export default DashIconContainer;