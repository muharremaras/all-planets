import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import { useParams } from 'react-router-dom';
import Loading from '../components/loading';
import IPlanetDetail from '../interfaces/planet-detail';
import axios from 'axios';

const Detail: React.FunctionComponent<Ipage> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('...');
  const [uid, setUid] = useState<number>();
  const [planet, setPlanet] = useState<IPlanetDetail>();
  //let params = useParams();

  const detail = () => {
    setLoading(true);

    axios
      .get('https://www.swapi.tech/api/planets/' + 1)
      .then(function (response) {
        const model = response.data.result.properties;
        let uid = response.data.result.uid;

        setPlanet({ ...model, uid: response.data.result.uid });
        setName(model.name);
        setLoading(false);

        if (uid < 21) setUid(response.data.result.uid);
        else if (uid < 41) setUid(response.data.result.uid - 20);
        else if (uid < 61) setUid(response.data.result.uid - 40);
      })
      .catch(function (error) {
        setLoading(false);
        setName('Nothing :(');
        setUid(-1);

        setPlanet({
          diameter: '?',
          rotation_period: '?',
          orbital_period: '?',
          gravity: '?',
          population: '?',
          climate: '?',
          terrain: '?',
        });
      });
  };

  useEffect(() => {
    detail();
  }, []);

  return (
    <>
      <h1 className="title">
        {props.title} {name}
      </h1>
      {loading ? (
        <div className="w-fit mx-auto mt-20">
          <Loading width={150} height={150} />
        </div>
      ) : (
        <div className="flex container mx-auto justify-center gap-20 mt-20">
          <div>
            <img src={'/planets/' + uid + '.png'} alt="" width={256} />
          </div>
          <div className="text-white text-xl">
            <div>
              Diameter :{' '}
              <span className="text-gray-500">{planet?.diameter}</span>
            </div>
            <div className="mt-5">
              Rotation Period :{' '}
              <span className="text-gray-500">{planet?.rotation_period}</span>
            </div>
            <div className="mt-5">
              Orbital Period :{' '}
              <span className="text-gray-500">{planet?.orbital_period}</span>
            </div>
            <div className="mt-5">
              Gravity : <span className="text-gray-500">{planet?.gravity}</span>
            </div>
            <div className="mt-5">
              Population :{' '}
              <span className="text-gray-500">{planet?.population}</span>
            </div>
            <div className="mt-5">
              Climate : <span className="text-gray-500">{planet?.climate}</span>
            </div>
            <div className="mt-5">
              Terrain : <span className="text-gray-500">{planet?.terrain}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
