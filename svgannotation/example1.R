# http://www.omegahat.org/SVGAnnotation/SVGAnnotationPaper/SVGAnnotationPaper.html
# http://bioconductor.org/packages/release/extra/html/SVGAnnotation.html
# use following command to install SVGAnnotationa
# source("http://bioconductor.org/biocLite.R")
# biocLite("SVGAnnotation")
depth.col = gray.colors(100)[cut(quakes$depth, 100, label=FALSE)]
depth.ord = rev(order(quakes$depth))
doc = svgPlot(
 	plot(lat ~ long, data = quakes[depth.ord, ],
      	pch = 19, col = depth.col[depth.ord],
      	xlab = "Longitude", ylab="Latitude",
      	main = "Fiji Region Earthquakes") )
addToolTips(doc, 
    apply(quakes[depth.ord, ], 1, 
        function(x)
            paste(names(quakes), x,sep = " = ", collapse = ", ")))
ax = getAxesLabelNodes(doc)
# Tooltips 直接加中文不行，先用英文做一個佔位置，事後再修改。
# 同時encoding='UTF-8'
addToolTips(ax[c("xaxis", "yaxis")], c("Degrees east of the prime meridean",
            "Degrees south of the equator"), addArea = TRUE)
# Tooltips 與 Links 不能重複
usgs = "http://www.ceec.edu.tw/"
region = ""
addAxesLinks(ax$title, paste(usgs, region, sep = ""))
saveXML(doc, "quakes_tips.svg")


# Example 3
data(election2008)
stateO = sapply(states, function(x) sum(x$Obama))
stateM = sapply(states, function(x) sum(x$McCain))
winner = 1 + (stateO > stateM)
regions = gsub("-", " ", names(winner)) 
stateInd = match.map("state", regions)
polyWinners = winner[stateInd]
stateColors =  c("#E41A1C", "#377EB8")[polyWinners]
doc = svgPlot({
                map('state', fill = TRUE, col = stateColors)
                title("Election 2008")
              }
             )
polygonPaths = getPlotPoints(doc)
length(polygolsnPaths)
length(stateInd)
urls = paste("http://elections.nytimes.com/2008/results/states/", 
             names(winner)[stateInd],".html", sep="")
addLink(polygonPaths, urls, css = character())
saveXML(doc, "election.svg")
