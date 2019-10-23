import { GraphQLClient, ClientContext, useQuery } from 'graphql-hooks';
import { Card, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageGallery from 'react-image-gallery';
import React from 'react';
import './App.css';


import 'react-image-gallery/styles/css/image-gallery.css';
import './gallery.css';

const client = new GraphQLClient({
  url: 'http://localhost:4000/graphql'
})

const CREATE_QUESTION = `
  mutation($taxonId: ID!) {
    createQuestion(taxonId: $taxonId) {
      qid
      pics
      choices {
        taxonId
        name
        commonName
      }
    }
  }
`;

function Question() {
  const { loading, error, data } = useQuery(CREATE_QUESTION, {
    variables: {
      taxonId: 47347,
    }
  });

  if (loading) return 'Loading...';
  console.log(error);
  if (error) return 'Something Bad Happened: ' + JSON.stringify(error, undefined, 2);
  const images = data.createQuestion.pics.map( (pic) => {
    return {
      original: pic,
      thumbnail: pic.replace('medium.jp', 'square.jp')
    }
  });
  console.log(images);
  return (
    <div>
          <Card bg="secondary" text="blue" style={{ width: '50rem' }}>
      <Card.Header>Header</Card.Header>
      <Card.Body style={{ }}>
          <ImageGallery
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
            showThumbnails={false}
            items={images} />
                </Card.Body>
    </Card>
    </div>
  );
  return (
    <Card bg="secondary" text="white" style={{ width: '50rem' }}>
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Image src={data.createQuestion.pics[0]} fluid />
        <Card.Title>Secondary Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk
          and      of the card's content.
and    </Card.Text>
      </Card.Body>
    </Card>
  );
  return JSON.stringify(data, undefined, 2);
}

function App() {
  return (
    <ClientContext.Provider value={client}>
      <div>
        <Question />
      </div>
    </ClientContext.Provider>
  );
}

export default App;
