import React from 'react';
import {
    Avatar,
    Card,
    Space,
    Divider,
    Button,
    Row,
    Col,
    Modal,
    Input,
    Typography,
  } from "antd"; 

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_GROUP } from '../../utils/queries';

const SingleGroup = () => {

    const { groupId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_GROUP, {
        // pass URL parameter
        variables: { groupId: groupId },
      });
    
      const group = data?.group || {};
    
      if (loading) {
        return <div>Loading...</div>;
      }

      return (
        <Typography.Title>{group.groupname}</Typography.Title>

      );



};


export default SingleGroup;