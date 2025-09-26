import { useContext, useEffect } from 'react';
import { StripePostPaymentContext } from './ContextApi/StripePostPaymentProvider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const BookedItems = () => {
  const { handlePostPayment, bookedItems } = useContext(StripePostPaymentContext);

  useEffect(() => {
    handlePostPayment();
  }, []);

  console.log(bookedItems);

  return (
    <div className="max-w-screen-2xl mx-auto px-14 py-6">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Customer Email</TableCell>
              <TableCell>Item Quantity</TableCell>
              <TableCell>Item Amount</TableCell>
              <TableCell>Item(s) Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookedItems &&
              bookedItems.map((item) =>
                item.items.map((it) => (
                  <TableRow key={it._id}>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.customerEmail}</TableCell>
                    <TableCell>{it.itemQuantity}</TableCell>
                    <TableCell>{it.itemAmount / 100}</TableCell>
                    <TableCell>{it.amountSubtotal / 100}</TableCell>
                  </TableRow>
                ))
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <h3 className="text-2xl font-semibold mt-4 text-gray-800">Total Amount Paid:
  ${ bookedItems && bookedItems.length > 0 && bookedItems[0].totalAmount / 100}
</h3>

    </div>
  );
};

export default BookedItems;
