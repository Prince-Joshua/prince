import CodeBlock from '@/components/custom/CodeBlock';
import SecLabel from '@/components/custom/SecLabel';
import { HEX, tokens } from '@/utils/tokens';
import { Box, Grid, Text } from '@chakra-ui/react';
import React from 'react'

const ApiDesign = () => {
 const successJson = `{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "64abc...",
    "name": "Shea Butter Blend",
    "price": 4500,
    "avgRating": 4.7
  },
  "error": null
}`;

 const errorJson = `{
  "success": false,
  "message": "Validation failed",
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "fields": {
      "price": "Must be a positive number",
      "name": "Required"
    }
  }
}`;
  
  const errorHandlerCode = `// All errors funnel through a single Express error middleware.
  // No stack traces reach the client in production.
  
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isZodError = err instanceof ZodError;
  
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal server error",
      data: null,
      error: {
        code: isZodError ? "VALIDATION_ERROR" : "SERVER_ERROR",
        fields: isZodError ? err.flatten().fieldErrors : null,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
      }
    });
  });`;

 const statusCodes = [
   {
     code: "200",
     meaning: "OK",
     when: "Successful GET / PUT / PATCH operations",
     color: "#6ee7b7",
   },
   {
     code: "201",
     meaning: "Created",
     when: "Successful POST — new user, product, order, or ticket",
     color: "#6ee7b7",
   },
   {
     code: "400",
     meaning: "Bad Request",
     when: "Zod validation failure — field-level errors returned in error.fields",
     color: HEX.accent3,
   },
   {
     code: "401",
     meaning: "Unauthorized",
     when: "Missing or invalid JWT / session cookie",
     color: HEX.accent3,
   },
   {
     code: "403",
     meaning: "Forbidden",
     when: "Authenticated but insufficient role (e.g. non-admin on admin route)",
     color: HEX.accent3,
   },
   {
     code: "404",
     meaning: "Not Found",
     when: "Resource does not exist or was soft-deleted",
     color: HEX.accent3,
   },
   {
     code: "409",
     meaning: "Conflict",
     when: "Duplicate coupon redemption, already-liked product",
     color: HEX.accent3,
   },
   {
     code: "500",
     meaning: "Server Error",
     when: "Caught by global error handler — never leaks stack traces to client",
     color: "#f87171",
   },
 ];


   return (
     <Box
       as="section"
       id="api"
       borderBottom="1px solid"
       borderColor={tokens.border}
       py="90px"
     >
       <SecLabel>07 — API Design Contract</SecLabel>

       {/* Response envelope */}
       <Box mb="32px">
         <Text
           fontFamily="heading"
           fontWeight="700"
           fontSize="14px"
           color={tokens.text}
           mb="12px"
         >
           Standard Response Envelope
         </Text>
         <Text fontSize="13px" color={tokens.muted2} mb="16px">
           Every endpoint — success or failure — returns a consistent envelope.
           Clients never need to guess the response shape.
         </Text>
         <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="2px">
           <Box>
             <Text
               fontSize="10px"
               letterSpacing="0.2em"
               textTransform="uppercase"
               color={tokens.accent}
               mb="8px"
             >
               Success Response
             </Text>
             <CodeBlock>{successJson}</CodeBlock>
           </Box>
           <Box>
             <Text
               fontSize="10px"
               letterSpacing="0.2em"
               textTransform="uppercase"
               color={tokens.accent3}
               mb="8px"
             >
               Error Response
             </Text>
             <CodeBlock>{errorJson}</CodeBlock>
           </Box>
         </Grid>
       </Box>

       {/* Status codes */}
       <Box mb="32px">
         <Text
           fontFamily="heading"
           fontWeight="700"
           fontSize="14px"
           color={tokens.text}
           mb="16px"
         >
           HTTP Status Code Philosophy
         </Text>
         <Box border="1px solid" borderColor={tokens.border} overflowX="auto">
           <Grid templateColumns="80px 140px 1fr" bg={tokens.surface2}>
             {["Code", "Meaning", "When Used in SassyBlend"].map((h) => (
               <Text
                 key={h}
                 px="16px"
                 py="12px"
                 fontSize="10px"
                 letterSpacing="0.2em"
                 textTransform="uppercase"
                 color={tokens.muted}
                 fontFamily="mono"
               >
                 {h}
               </Text>
             ))}
           </Grid>
           {statusCodes.map((s) => (
             <Grid
               key={s.code}
               templateColumns="80px 140px 1fr"
               borderTop="1px solid"
               borderColor={tokens.border}
             >
               <Text
                 px="16px"
                 py="12px"
                 fontSize="12px"
                 fontWeight="600"
                 color={s.color}
                 fontFamily="mono"
               >
                 {s.code}
               </Text>
               <Text px="16px" py="12px" fontSize="12px" color={tokens.muted2}>
                 {s.meaning}
               </Text>
               <Text
                 px="16px"
                 py="12px"
                 fontSize="12px"
                 color={tokens.muted2}
                 lineHeight="1.6"
               >
                 {s.when}
               </Text>
             </Grid>
           ))}
         </Box>
       </Box>

       {/* Error handler */}
       <Box>
         <Text
           fontFamily="heading"
           fontWeight="700"
           fontSize="14px"
           color={tokens.text}
           mb="16px"
         >
           Global Error Handler Pattern
         </Text>
         <CodeBlock>{errorHandlerCode}</CodeBlock>
       </Box>
     </Box>
   );
 
}

export default ApiDesign