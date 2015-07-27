library(rgdal)
 
# for shapefiles, first argument of the read/write/info functions is the
# directory location, and the second is the file name without suffix
 
# optionally report shapefile details
ogrInfo(".", "counties_WGS84")
# Source: ".", layer: "counties_WGS84"
# Driver: ESRI Shapefile; number of rows: 617 
# Feature type: wkbPolygon with 2 dimensions
# Extent: (119.9969 21.89661) - (124.5775 25.9371)
# LDID: 79 
# Number of fields: 4 
#         name type length typeName
# 1     townid    4      8   String
# 2   towncode    4      7   String
# 3 countyname    4     14   String
# 4   townname    4     14   String
 
# read in shapefiles
#counties.rg <- readOGR(".","鄉鎮界_WGS84")  # not work, may be chinese characters in filename
counties.rg <- readOGR(".","counties_WGS84") # Work ! counties_WGS84 is clone of 鄉鎮界_WGS84
#counties.rg <- readOGR(".", "counties-maptools")
 
# note that readOGR will read the .prj file if it exists
print(proj4string(counties.rg))
# [1] NA

proj4string(counties.rg) <- "+proj=longlat +datum=WGS84"
 
# generate a simple map showing layers
plot(counties.rg, axes=TRUE, border="gray")
# points(centroids.rg, pch=20, cex=0.8)
# lines(rivers.rg, col="blue", lwd=2.0)
 
# write out a new shapefile (including .prj component)
writeOGR(counties.rg, ".", "counties-rgdal", driver="ESRI Shapefile")