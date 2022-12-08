import { CircularProgress, Grid } from "@mui/material"
import { palette } from "@mui/system"


export const CheckingAuthItem = () => {

    return (
      
      <Grid container spacing={ 0 } className="bg-color-item" direction="column" alignItems="center" justifyContent="center" 
            sx={{ minHeight: '100vh', padding: 4  }}
      >
          <Grid container direction="row" justifyContent="center"     >
              <CircularProgress color="primary"/>
          </Grid>
      </Grid>
    )
  }