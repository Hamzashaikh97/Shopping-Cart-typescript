import { useState } from 'react';
import { useQuery } from 'react-query';
import { LinearProgress, Drawer, Badge, Grid } from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons'
import Items from './Items/Items'
import Cart from './Cart/Cart'
import { Wrapper, StyledButton } from './App.styles'

export type CartItemType = {

  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  amount: number;
}





const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {


  const [cartItems, setcartItems] = useState([] as CartItemType[]);
    const [cartOpen, setCartOpen] = useState(false)
  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts);
  console.log(data)

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);


  const handleAddToCart = (clickedItems: CartItemType) => {
    setcartItems((prev: any[]) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItems.id);

      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItems.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItems, amount: 1 }];    
    });
  };
  function handleRemoveCart(id: number) {
    setcartItems(prev => prev.reduce((ack, item) => {
      if (item.id === id) {
        if (item.amount === 1)
          return ack;
        return [...ack, { ...item, amount: item.amount - 1 }];
      } else {
        return [...ack, item];
      }
    }, [] as CartItemType[])
    );
  }

  
  if (isLoading) return <LinearProgress />
  if (error) return <div>something went wrong</div>


  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveCart}


        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>


        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>

      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>

            <Items item={item} handleAddToCart={handleAddToCart} />

          </Grid>

        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;