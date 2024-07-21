const TopButton = () => {
    const moveToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <button className="move-to-top" onClick={moveToTop} />
    );
}

export default TopButton;