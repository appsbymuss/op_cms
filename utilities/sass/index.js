const fs = require('fs');
const path = require('path');

const nodesass = require('node-sass');
const tinycolor = require('tinycolor2');

  
function compileSass(pColor,sColor) {
    // Hex to RGB
    const primaryColor = Object.values(tinycolor(pColor).toRgb());
    const secondaryColor = Object.values(tinycolor(sColor).toRgb());
    return new Promise((resolve, reject) => {
    nodesass.render({
        file:__dirname + '/scss/myvalues.scss',
        outFile:'/public/assets_client/bootstrap/css',
        functions: {
          'getVariable($name)': function(name) {
            // Define your variables here
            if (name.getValue() === 'primary') {
              return nodesass.types.Color(...primaryColor);
            } else if (name.getValue() === 'secondary') {
              return nodesass.types.Color(...secondaryColor);
            } else {
              return nodesass.types.Null();
            }
          }
        }
        },function(error, result) {
          if (error) {
            reject(error);
          } else {
            // Write CSS to file
            fs.writeFile(path.join('public', 'assets_client', 'bootstrap', 'css', 'bootstrap.min1.css'), result.css, function(err) {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          }
        });
      });
}

module.exports = {
  compileSass,
};
  