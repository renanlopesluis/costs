import Item from '../Item/Item';

function List({items}){
    return (
        <>
            <h3>My List</h3>
            {items.length > 0 ? (
            <ul>
            {items.map(
                (item, index) => (
                   <Item id={index} description={item}/>
                )
            )}
            </ul>      
            ) : (
                <p>There's no item to show.</p>
            )}  
        </>
    )

}
export default List;