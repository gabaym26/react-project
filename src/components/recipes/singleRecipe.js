import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { deleteRecipe } from "../service/recipe";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(recipe) {
  const add = (x) => {
    const item = { Name: x.Name, UserId: user.Id, Count: 1 }
    axios.post(`http://localhost:8080/api/bay`, item)
      .then(alert('המוצר נוסף בהצלחה'))
      .catch(err=>console.log(err))
  }
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const [expanded, setExpanded] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const deleteR = (id) => {
    console.log("1")
    dispatch(deleteRecipe(id));
    console.log("2")
    setIsDeleted(true);
  }
  const EditRecipe = (recipe) => {
    dispatch({ type: 'SET_SELECTED_RECIPE', data: recipe });
    navigate('../addRecipe')
  }

  
  return (<>
    {isDeleted && null}
    {!isDeleted && <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={recipe.Name}
        subheader={recipe.Description}
      />
      <CardMedia
        component="img"
        height="194"
        image={recipe?.Img}
        alt={recipe.name}
      />
      {user.Id === recipe.UserId && <button
        onClick={() => deleteR(recipe.Id)}>
        מחק
      </button>}

      {user.Id === recipe.UserId && <button
        onClick={() => EditRecipe(recipe)}
      >
        ערוך
      </button>}
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph class="paragraph"> :{recipe.Name}</Typography>
          <Typography paragraph  class="paragraph">
            החומרים להכנה
          </Typography>
          <Typography paragraph class="paragraph">
            {recipe.Ingrident.map((x, index) =>
              <div class="flex" >
                <button class="index" onClick={() => add(x)} />
                <div class="margin">{x.Count}</div>
                <div class="margin">{x.Type}</div>
                <div class="margin">{x.Name}</div>
              </div>
            )}
          </Typography>
          <Typography   class="paragraph">
            אופן ההכנה: {recipe.Instructions}
          </Typography>
          <Typography   class="paragraph">
            זמן ההכנה: {recipe.Duration} דקות
          </Typography>
          <Typography   class="paragraph">
          רמת קושי: {recipe.Difficulty}
          </Typography>
          <Typography paragraph class="paragraph">
            ...!!בהצלחה ובתאבון
          </Typography>
        </CardContent>
      </Collapse>
    </Card>}</>
  );
}









