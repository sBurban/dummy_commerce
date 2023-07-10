import React from 'react'
import { GridHeader } from '@/components/commons/GridHeader';
import { FormReadOnly } from '@/components/forms/FormReadOnly';
import { Box, Typography, Button } from '@mui/material';

import { AddressDetailsProps } from '@/pages/account/addresses/[...detailsId]';
import { AddressType } from '@/lib/common/Types';

export const AddressDetails = ({user_address, ...props}:AddressDetailsProps) => {

    if(!user_address){
        return <div>Address not found</div>
      }

      const data = Object.keys(user_address).map( (objkey:string) => {
          return {title: objkey, value: user_address[objkey as keyof AddressType] }
      });
      const formReadOnlyElems = <FormReadOnly data={data} />

      const detailsElem = <Box>
        <GridHeader >
          <Typography component="span" variant="h5" >
              Address Details
          </Typography>
          <Button variant="outlined" sx={{ marginRight: '0.5rem' }}
              // onClick={() => setIsEdit(!isEdit)}
          >
            Edit
              {/* {!isEdit? "Edit" : "Cancel"} */}
          </Button>
        </GridHeader>

        {formReadOnlyElems}

      </Box>

    return (<>
        {detailsElem}
    </>)
}
