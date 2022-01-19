/* eslint-disable */

import { useState } from "react";
import  { useQuery,gql} from "@apollo/client";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MyUsers(){


  const GET_USER = gql`
    query GetUser {
      users {
        _id
        email
        password
        guest {
          _id
          name
          domain
          thumb
          description
          comission
          categories
          shippingTime
          approvalNeeded
        }
        host {
          _id
          name
          domain
          categories
          thumb
        }
      }
    }`;




  const { loading, error, data } = useQuery(GET_USER);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


    return(<Table>
      <TableHead>
         <TableRow>
           <TableCell>Id</TableCell>
           <TableCell align="center">Email</TableCell>
           <TableCell align="center">Password</TableCell>
           <TableCell align="center">TypeName</TableCell>
           <TableCell align="center">Guest</TableCell>
           <TableCell align="center">Host</TableCell>

         </TableRow>
       </TableHead>
    {data.users.map((item,key) => (
      <TableBody key={key}>
      <TableRow>
      <TableCell>{item._id}</TableCell>
      <TableCell align="center">{item.email}</TableCell>
      <TableCell align="center">{item.password}</TableCell>
      <TableCell align="center">{item.__typename}</TableCell>
      {item.guest?
        <TableCell align="center">
        <TableHead>
           <TableRow>
             <TableCell align="center">Id</TableCell>
             <TableCell align="center">ApprovalNeeded</TableCell>
             <TableCell align="center">Categories</TableCell>
             <TableCell align="center">Comission</TableCell>
             <TableCell align="center">Description</TableCell>
             <TableCell align="center">Domain</TableCell>
             <TableCell align="center">Name</TableCell>
             <TableCell align="center">ShippingTime</TableCell>
             <TableCell align="center">Thumb</TableCell>
             <TableCell align="center">TypeName</TableCell>

           </TableRow>
         </TableHead>
         <TableBody>
          <TableRow>
              <TableCell>{item.guest._id}</TableCell>
              <TableCell>{item.guest.approvalNeeded}</TableCell>
              <TableCell>{item.guest.categories.map((category,key)=> {return (<p key={key}>{category}</p>)})}</TableCell>
              <TableCell>{item.guest.comission}</TableCell>
              <TableCell>{item.guest.description}</TableCell>
              <TableCell>{item.guest.domain}</TableCell>
              <TableCell>{item.guest.name}</TableCell>
              <TableCell>{item.guest.shippingTime}</TableCell>
              <TableCell>{item.guest.thumb}</TableCell>
              <TableCell>{item.guest.__typename}</TableCell>

              </TableRow>
         </TableBody>

        </TableCell>
        :null}

        {item.host?
          <TableCell align="center">
          <TableHead>
             <TableRow>
             <TableCell align="center">Id</TableCell>
               <TableCell align="center">Categories</TableCell>
               <TableCell align="center">Domain</TableCell>
               <TableCell align="center">Name</TableCell>
               <TableCell align="center">Thumb</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
            <TableRow>
            <TableCell>{item.host._id}</TableCell>
                <TableCell>{item.host.categories.map((category,key)=> {return (<p key={key}>{category}</p>)})}</TableCell>
                <TableCell>{item.host.domain}</TableCell>
                <TableCell>{item.host.name}</TableCell>
                <TableCell>{item.host.thumb}</TableCell>
                <TableCell>{item.host.__typename}</TableCell>
                </TableRow>
           </TableBody>

          </TableCell>
          :null}

        </TableRow>
      </TableBody>



    ))}
    </Table>)
}
