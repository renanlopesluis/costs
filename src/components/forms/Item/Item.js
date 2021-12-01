import PropTypes from 'prop-types';

function Item({id, description}){
    return (
        <>
            <li>{id} - {description}</li>
        </>
    )
}

Item.propTypes = {
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
}
export default Item;