import React from 'react'
import { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data'
import Spinner from './Spinner'

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId)
    
    if(query){
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);

          if(data[0]){
            query = pinDetailMorePinQuery(data[0])

            client.fetch(query)
              .then((res) => setPins(res))
          }
        })
    }
  }
  useEffect(() => {
    fetchPinDetails()
  }, [pinId])
  
  if(!pinDetail) return <Spinner message='Loading Pin deets...' />


  return (
    <div>
      PinDetails
    </div>
  )
}

export default PinDetail