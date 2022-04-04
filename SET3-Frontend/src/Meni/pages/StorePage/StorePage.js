import { Link } from 'react-router-dom';
import { default as MuiListItem } from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import List from './List';
import { useState, useEffect } from 'react';

function CashboxPage(props) {

	const data = [{ name: "Poslovnica 1", id: 1 }, { name: "Poslovnica 2", id: 2 }, { name: "Poslovnica 3", id: 3 }];



	return (
		<List sampleData={data} />
	)
}


export default CashboxPage;