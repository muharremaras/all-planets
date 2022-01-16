import React, { useEffect, useState } from 'react';
import Ipage from '../interfaces/page';
import IPlanet from '../interfaces/planet';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../components/loading';

const Home: React.FunctionComponent<Ipage> = (props) => {
  const [planets, setPlanets] = useState<IPlanet[]>([]);
  const [pages, setPages] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const list = () => {
    setLoading(true);

    axios
      .get('https://www.swapi.tech/api/planets?limit=10&page=' + page)
      .then(function (response) {
        setLoading(false);
        setPages(response.data.total_pages);
        setPlanets(response.data.results);
      })
      .catch(function (error) {
        setLoading(false);

        setPlanets([
          {
            uid: -1,
            name: 'Planets not listed :(',
            url: '',
          },
        ]);
      });
  };

  useEffect(() => {
    if (page) list();
  }, [page]);

  return (
    <>
      <h1 className="title">{props.title}</h1>
      {loading ? (
        <div className="w-fit mx-auto mt-20">
          <Loading width={150} height={150} />
        </div>
      ) : (
        <div className="container mx-auto flex justify-center flex-wrap">
          {planets.map((planet: IPlanet, index: number) => {
            return (
              <div key={index} className="w-1/5 relative mt-20">
                <Link to={'/detail/' + planet.uid}>
                  <img
                    src={
                      '/planets/' +
                      (planet.uid === -1
                        ? -1
                        : page % 2 !== 0
                        ? index + 1
                        : index + 11) +
                      '.png'
                    }
                    className="w-24 mx-auto hover:animate-spin"
                    alt=""
                  />
                  <p className="text-white text-center mt-5 text-xl">
                    {planet.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      <div className="flex container mx-auto justify-center gap-6 mt-20">
        {pages &&
          [...Array(pages)].map((value: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => setPage(index + 1)}
                className={
                  'text-white border p-5 cursor-pointer hover:bg-blue-600 border-white rounded-md ' +
                  (index + 1 === page ? 'bg-blue-600' : '')
                }
              >
                {index + 1}
              </div>
            );
          })}
        <div>aras</div>
      </div>
    </>
  );
};

export default Home;
