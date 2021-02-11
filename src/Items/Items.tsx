import { Wrapper } from './/Item.styles';
import { CartItemType } from '../App'
import { Button } from '@material-ui/core';

export type Props = {

    item: CartItemType;
    handleAddToCart: (clicked: CartItemType) => void

}


const Items: React.FC<Props> = ({ item, handleAddToCart }) => (

    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>



    </Wrapper>


)

export default Items;



