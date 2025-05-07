

const MoviesItem = ({id,title,duration,img}) => {


    return (
        <div className="w-70 bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform">
          <div className="aspect-[9/16] overflow-hidden">
            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2 text-white">
            <h3 className="text-lg font-bold truncate">{title}</h3>
            <p className="text-xs text-gray-400 mt-1">{duration} min</p>
          </div>
        </div>
      );
    };



export default MoviesItem;