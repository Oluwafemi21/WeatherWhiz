
const Loader = () => {

    return (
        <>
           <div className="flex items-center justify-center flex-col min-h-full  gap-4">
                    <p className="text-center my-5">
                        Fetching weather information...
                </p>
                <span className="loader"></span>
            </div>
        </>
    );
};

export default Loader;
