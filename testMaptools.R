library(maptools)

# read in shapefiles; here we use the specialized readShape* functions,
# but readShapeSpatial would produce identical output in all three cases
# centroids.mp <- readShapePoints("鄉鎮界_WGS84")  # no Points
# rivers.mp <- readShapeLines("鄉鎮界_WGS84")      # no Lines
counties.mp <- readShapePoly("鄉鎮界_WGS84")
 
# note that readShape* does _not_ read the shapefile's .prj file
print(proj4string(counties.mp))
## [1] NA
 
# specifying projection information is not strictly necessary for
# plotting, but does yield nicer default axis labels and aspect ratio in
# the case of geographic data
proj4string(counties.mp) <- "+proj=longlat +datum=WGS84"
 
# generate a simple map showing layers
plot(counties.mp, axes=TRUE, border="gray")
# points(centroids.mp, pch=20, cex=0.8)
# lines(rivers.mp, col="blue", lwd=2.0)

# After understanding the data structure of shapefile,
# use simple naive plot,points,lines command to plot boundary and centroid
# written by Hon-Jang Yang
plot(x=0,y=0,type='n',xlim=counties.mp@bbox[1,],ylim=counties.mp@bbox[2,],
	xlab="",ylab='')
for (i in 1:length(counties.mp@polygons)){
	for (j in 1:length(counties.mp@polygons[[i]])){
		lines(counties.mp@polygons[[i]]@Polygons[[j]]@coords)
		points(counties.mp@polygons[[i]]@Polygons[[j]]@labpt[1],
			counties.mp@polygons[[i]]@Polygons[[j]]@labpt[2])
	}
}
polygon(x=counties.mp@polygons[[9]]@Polygons[[1]]@coords[,1],
	y=counties.mp@polygons[[9]]@Polygons[[1]]@coords[,2],col='red')
 
# write out a new shapefile (but without .prj); the more general
# writeSpatialShape would produce equivalent output
writePolyShape(counties.mp, "counties-maptools")    