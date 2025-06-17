import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

export default function BlogPost({ post }) {
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
      {post.imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={post.imageUrl}
          alt={post.title}
        />
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.date}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">{post.content}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
