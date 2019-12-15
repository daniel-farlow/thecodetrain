import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  CardHeaderTitle,
  CardContent,
  Content,
  CardFooter,
  CardFooterItem,
  Media,
  MediaContent,
  Title,
  Subtitle
} from 'bloomer';

const BootcampResourceGet = () => {
  const user = useSelector(state => state.user);
  const [resources, setResources] = useState([]);
  const [resourcesFetched, setResourcesFetched] = useState(false);

  const fetchResourcesData = async () => {
    const resourcesEndpoint = 'http://localhost:3000/resources/getAllResources';
    const res = await axios.get(resourcesEndpoint);
    setResources(res.data);
    setResourcesFetched(!resourcesFetched);
  };

  useEffect(() => {
    fetchResourcesData();
  }, []);

  return (
    <ResourceWrapper>
      {resourcesFetched ? (
        resources.map((resource, i) => {
          const {
            id,
            up_votes,
            down_votes,
            title,
            short_description: descriptionShort,
            full_description: descriptionFull,
            resource_url: resourceURL,
            date_posted: datePosted /* information beyond this line relates to resource poster */,
            users_id: usersId,
            email, 
            first_name: firstName,
            last_name: lastName,
            github_url: githubLink,
            linkedin_url: linkedinLink,
            bootcamp_name: bootcampAffiliation
          } = resource;
          return (
            <Card key={i} style={{ maxWidth: '600px', margin: '20px' }}>
              <CardHeader>
                <CardHeaderTitle>{title}</CardHeaderTitle>
              </CardHeader>
              <CardContent>
                <Media>
                  <MediaContent hasTextAlign={'left'}>
                    <Title isSize={5}>Resource Info</Title>
                    <Subtitle isSize={6}>
                      <Anchor href={resourceURL}>Link to resource</Anchor>
                      <p>
                        Posted:{' '}
                        <Moment format="YYYY-MM-DD">{datePosted}</Moment>
                      </p>
                    </Subtitle>
                  </MediaContent>
                  <MediaContent hasTextAlign={'right'}>
                    <Title isSize={5}>Resource Creator</Title>
                    <Subtitle isSize={6}>
                      <Breadcrumb isSize={`small`} isAlign={'right'}>
                        <ul>
                          <BreadcrumbItem>
                            <Link to={`/user/${usersId}`}>{firstName} {lastName}</Link>
                          </BreadcrumbItem>
                          <BreadcrumbItem>
                            <a href={`mailto:${email}`}>Email</a>
                          </BreadcrumbItem>
                        </ul>
                        <ul>
                          <BreadcrumbItem>
                            <a href={githubLink}>GitHub</a>
                          </BreadcrumbItem>
                          <BreadcrumbItem>
                            <a href={linkedinLink}>LinkedIn</a>
                          </BreadcrumbItem>
                        </ul>
                      </Breadcrumb>
                    </Subtitle>
                  </MediaContent>
                </Media>
                <Content>
                  <Box>{descriptionShort}</Box>
                </Content>
                <Content>{descriptionFull}</Content>
              </CardContent>
              {user.id === usersId ? (
                <CardFooter>
                  <CardFooterItem>
                    <a href="#">Edit</a>
                  </CardFooterItem>
                  <CardFooterItem>
                    <a href="#">Delete</a>
                  </CardFooterItem>
                </CardFooter>
              ) : null}
            </Card>
          );
        })
      ) : (
        <p>Loading ...</p>
      )}
    </ResourceWrapper>
  );
};

const Anchor = styled.a`
  color: blue;
`;

const ResourceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export default BootcampResourceGet;