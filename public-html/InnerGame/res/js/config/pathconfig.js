const path_config = {

};
const directions = {
  null: new FastVector(0, 0),
  north: new FastVector(0, 1),
  northeast: new FastVector(-1, 1),
  east: new FastVector(-1, 0),
  southeast: new FastVector(-1, -1),
  south: new FastVector(0, -1),
  southwest: new FastVector(1, -1),
  west: new FastVector(1, 0),
  northwest: new FastVector(1, 1)
};