import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { People } from "../../types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { openDialogProfile } from "../../store/peoplesSlice";
import React from "react";

type PresonType = {
  people: People;
};

const Person: React.FC<PresonType> = React.memo(({ people }) => {
    const dispatch = useDispatch<AppDispatch>();
    const handleProfile = () => {
        dispatch(openDialogProfile(people))
    }

  return (
    <Card
      sx={{
        width: 400,
        margin: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
        <CardHeader
          avatar={
            <Avatar
              src={people.picture.thumbnail}
              alt={people.picture.thumbnail}
            />
          }
          title={people.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {people.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {people.country}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {people.phoneNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {people.email}
          </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={handleProfile}>Learn More</Button>
        </CardActions>
    </Card>
  );
});

export default Person;
