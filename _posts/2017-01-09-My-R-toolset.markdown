---
layout: post
title:  "My R toolset"
date:   2017-01-09 11:00:30 +0530
categories: R 
excerpt : some basic R commands that would be useful
---
In this post I will share a few standard R snippets that would be useful for some Machine 
Learning Problems. I learnt these from the [ISLR][islr] by Gareth James, Daniela Witten, Trevor Hastie and Robert Tibshirani, some examples are taken directly from this. 



CONTENTS

* TOC
{:toc}

Some basics
-----------

{% highlight R %}
x=c(2,7,5)                      # combine 2,7,5 into a vector
y=seq(from=4,length=3,by=3)     # sequence 4,7,10 is generated
?seq                            # lookup the description of seq function

# standard operations [ element wise ]

x+y
x/y
x^y

# Accessing Elements in Vectors

# [ Note: in R vectors are indexed starting from 1 ]

x[2]                # accessing index 2 
x[2:3]              # return elements from range 2:3
x[-2]               # all elements except the index 2
x[-c(1,2)]          # all elements except the index 1,2
  
# Matrix 

z=matrix(seq(1,12),4,3)  

#      [,1] [,2] [,3]
# [1,]    1    5    9
# [2,]    2    6   10
# [3,]    3    7   11
# [4,]    4    8   12

z[3:4,2:3]        # access elements rows 3:4, columns 2:3
z[,2:3]           # access columns 2:3 retrive all rows
z[,1]             # get the first column, but the return type is a vector
z[,1,drop=FALSE]  # this drop=FALSE , ensures it still retains a matrix form
dim(z)            # output the dimensions of the matrix

# Workspace commands
  
ls()    # Lists all variables in the workspace
rm(y)   # remove variable y from the workspace

# Generating random data, graphics

x = runif(50)       # uniform random values from range (0,1) 
                    # [ can be specifed check documentation]
y = rnorm(50)       # returns a vector of size 50 with random values 
                    # from standard normal distribution

plot(x,y)           # plot of y vs x 
plot(x,y,xlab="Random Uniform",ylab="Random Normal",pch="*",col="blue")  
# use ?plot to figure this out
par(mfrow=c(2,1))   # this enables use to show 2 plots one above the other
plot(x,y)
hist(y)
par(mfrow=c(1,1))   # Go back to the default view layout


# Reading in data form csv

Auto=read.csv("../input/Auto.csv")  
# read from a file called Auto.csv [ loads into a data frame ]
names(Auto)   # lists all the headers in the data frame
dim(Auto)     # dim of Auto [ like the Matrix ]
class(Auto)   # this command tells us the type of Auto
summary(Auto) # Lists statistics of all the variables in the data frame
plot(Auto$cylinders,Auto$mpg) # plot of Auto$mpg a column with header "mpg" vs 
                              # Auto$cylinders a column with header "cylinders"
attach(Auto)      # attach all variables of the frame Auto to our workspace

plot(cylinders,mpg) # now we can directly access the variables
                    # as they are the workspace

pdf(file="../mpg.pdf")    # plots into the pdf file [ set as the plot device ]
plot(cylinders,mpg,xlab="Cylinders",ylab="Mpg",col="red")
dev.off()                 # go back to the default plot device

# plots between different columns of the data frame 
# displayed in a single window
pairs(Auto,col="brown")   

# plots pairs of variables involved 
# usefull when the number of features is large
pairs(mpg~cylinders+acceleration+weight,Auto) 

install.packages('ISLR') # installs the package 'ISLR'

# following commands can be used to load the package
library(ISLR) 
require(ISLR)

q()             # quit

{% endhighlight %}

Linear Regression
------------------

{% highlight R %}

library(MASS)  # we can use the Boston dataset

# Simple Linear Regression
fit = lm(medv~lstat,data=Boston)  
summary(fit)      # lists the coefficients

plot(medv~lstat,data=Boston)
abline(fit,col="blue")        # plots the fit on the plot

confint(fit)  # gives the 90% confidence 
              # interval for the model
              # parameters

new_set = c(5,10,15)

# predict medv for this new input parameter
predict(fit, data.frame(lstat=new_set,interval="confidence")) 

# Mutiple Linear Regression

fit = lm(medv~lstat+age,data=Boston)  # medv vs (lstat and age)

# medv vs (all variable except medv in the Boston data frame)
fit = lm(medv~.,data=Boston) 

# just remove the influence of age,indus in the fit
fit_new = update(fit,~.-age-indus) 

# Adding Nonlinear Terms and Interaction terms
fit = lm(medv~lstat*age,Boston) # interaction with age and lstat

fit = lm(medv~lstat + I(lstat^2),Boston)
# adding a non-linear in lstat
# we need I so that lm doesn't miss-interpret ^

fit = lm(medv~lstat+lstat:age,Boston) 
# : indicates interaction with lstat and age


fit = lm(medv~poly(lstat,5)) # 5th degree poly of lstat 


# plotting the fits
plot(medv~lstat,data=Boston)
points(lstat,fitted(fit),col="red",pch=20)

# Example for functions in R

# plots the simple regression fit 
regplot = function(x,y,...) {
  fit = lm(y~x)
  plot(x,y,...)
  abline(fit,col="red")
} 
# the ... passes all the other arguments
# to plot making it more flexible


{% endhighlight %}

Train-Test Split
-----------------

{% highlight R %}

# Say data is the data frame

train_size <- floor(0.7*nrow(data)) # 70% of data will be in the Train Set
set.seed(57)   # ensure reproducibility of the train set
train <- sample(seq_len(nrow(data)), size = train_size)

## now  data[train,] -> Train Set and data[-train,] -> Test Set

{% endhighlight %}


Logistic Regression
--------------------

{% highlight R %}

require(ISLR)

# using Smarket dataset from ISLR package

# train -- The Train Set split

# Fit the model on the train data
glm.fit=glm(Direction~Lag1+Lag2+Lag3+Lag4+Lag5+Volume,
            data=Smarket,family=binomial, subset=train) 

# Predict on the test data
glm.probs=predict(glm.fit,newdata=Smarket[-train,],type="response") 

# Interpretation of the probability
glm.pred=ifelse(glm.probs >0.5,"Up","Down")

actual_y = Smarket$Direction[-train] 
table(glm.pred,actual_y)      # Confusion Matrix
mean(glm.pred == actual_y)      # Accuracy of the model

{% endhighlight %}

Linear Discriminant Analysis (LDA)
-----------------------------------

{% highlight R %}

require(MASS)

lda.fit=lda(Direction~Lag1+Lag2,data=Smarket, subset=train)
# plot(lda.fit)

lda.pred=predict(lda.fit,Smarket[-train,],drop=F)
# data.frame(lda.pred)[1:5,]  -- view a few predictions 

table(lda.pred$class,Smarket[-train,]$Direction) # confusion matrix
mean(lda.pred$class == Smarket[-train,]$Direction) # Accuracy

{% endhighlight %}

K-Nearest Neighbors (KNN)
--------------------------

{% highlight R %}

library(class)

attach(Smarket)

X = cbind(Lag1,Lag2)

# Do the Train split

knn.pred=knn(X[train,],X[-train,],Direction[train],k=1) # 1-NN
table(knn.pred,Direction[-train])
mean(knn.pred == Direction[-train])

# In case you use kNN for a regression problem
# you might have to export knn.pred as as.numeric(knn.pred)
# and get the RSS [ Residual Sum of Squares]

{% endhighlight %}


Cross Validation
-----------------

{% highlight R %}

# For glm models

require(boot)

# let data be any data frame with fields x and y
fit <- glm(y~x,data=data)

# default LOOCV ( Leave one out Cross Validation)
cv.glm(data,fit)$delta # returns a vector of length 2
                       # first value is the raw CV error
                       # Second one is adjusted to account 
                       # for bias introduced by not using LOOCV.

## 10-fold CV

# Say we are trying to decide on the degree of polynomial of x
degree = 1:5
cv.error = rep(0,5)
for(d in degree) {
  fit = glm(y~poly(x,d), data=data)
  cv.error[d] = cv.glm(data, fit, K=10)$delta[1]
}
plot(degree,cv.error,type="b",col="red")


{% endhighlight %}


Bootstrap
----------

{% highlight R %}

# Say we are estimating the value of some parameter [alpha]
# and also it's Standard Deviation

alpha=function(x,y){
  vx=var(x)
  vy=var(y)
  cxy=cov(x,y)
  (vy-cxy)/(vx+vy-2*cxy)
}

alpha(data$x,data$y)

## For the standard error of alpha

alpha.fn=function(data, index){ # The statistic for which we'll estimate SD
  with(data[index,],alpha(x,y))
}

alpha.fn(data,1:50)

set.seed(1)
alpha.fn (data,sample(1:50,50,replace=TRUE)) # Something like bootstrap

boot.out=boot(data,alpha.fn,R=1000)  # using the library function 
                                     # R =1000 => thousand bootstrap samples
boot.out
plot(boot.out)

{% endhighlight %}

Decision Trees
---------------

{% highlight R %}
require(ISLR)
require(tree)
attach(Carseats)
High=ifelse(Sales<=8,"No","Yes")     # categorical response
Carseats=data.frame(Carseats, High)

tree.carseats=tree(High~.-Sales,data=Carseats) 
plot(tree.carseats)
text(tree.carseats,pretty=0)  # plots the tree


# train - Train Set sampling

tree.carseats=tree(High~.-Sales,Carseats,subset=train)

# Evaluation of the tree

# predict the class of the test data
tree.pred=predict(tree.carseats,Carseats[-train,],type="class") 
with(Carseats[-train,],table(tree.pred,High))  # Confusion matrix

# CV for pruning

# prune based on misclassification
cv.carseats = cv.tree(tree.carseats,FUN=prune.misclass) 
plot(cv.carseats)
# from the plot we can see that the best prunning factor would be 13

prune.carseats=prune.misclass(tree.carseats,best=13)

plot(prune.carseats);text(prune.carseats,pretty=0) # this would  be a 
                                                   # more readable tree

{% endhighlight %}

Random Forest
--------------

{% highlight R %}

require(randomForest)
require(MASS)          # for the Boston data set

set.seed(101)

# train - Generate a suitable train set index
train = sample(1:nrow(Boston),0.7*nrow(Boston))

rf.boston = randomForest(medv~.,data=Boston,subset=train) 

# ntree = 500 [ default 500 trees]
# mtry -> no. of features to consider 
#         for a split

# choosing hyper parameter mtry

oob.err = double(13)    # Out of Bag error estimate
test.err = double(13)   # Test error estimate for the fit

for(mtry in 1:13) {
  fit=randomForest(medv~.,data=Boston,subset=train,mtry=mtry,ntree=400)
  oob.err[mtry] = fit$mse[400]
  pred = predict(fit,Boston[-train,])
  test.err[mtry] = with(Boston[-train,],mean((medv-pred)^2))
  cat(mtry," ")     # indicate progress of mtry
}

matplot(1:mtry,cbind(test.err,oob.err),pch=19,col=c("red","blue")
,type="b",ylab="Mean Squared Error")
legend("topright",legend=c("OOB","Test"),pch=19,col=c("red","blue")) 
# The plots for OOB and the Test Error

{% endhighlight %}

Gradient Boosted Trees
-----------------------

{% highlight R %}

require(gbm)
require(MASS)

# train = training data rows

boost.boston=gbm(medv~.,data=Boston[train,],distribution="gaussian",
n.trees=10000,shrinkage=0.01,interaction.depth=4)

summary(boost.boston)  # lists the importance of features to predict the output
plot(boost.boston,i="lstat")
plot(boost.boston,i="rm")


# Test error as a function of no.of trees

n.trees=seq(from=100,to=10000,by=100)
predmat=predict(boost.boston,newdata=Boston[-train,],n.trees=n.trees)
dim(predmat)
berr=with(Boston[-train,],apply( (predmat-medv)^2,2,mean))
plot(n.trees,berr,pch=19,ylab="Mean Squared Error", 
xlab="# Trees",main="Boosting Test Error")

# Comparing with the above Random Forest model
abline(h=min(test.err),col="red") 


# Gradient Boosted trees do significantly better, but the
# hyperparameters should be tuned properly.

{% endhighlight %}


[islr]: http://www-bcf.usc.edu/~gareth/ISL/
