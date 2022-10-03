from flask import Flask, render_template, redirect, url_for, request, flash

import numpy as np
import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt  
import seaborn as sns
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
sns.set()

main = Flask(__name__)

main.config['SECRET_KEY'] = 'miniproject'

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/login')
def login():
    return render_template('login.html')

@main.route('/login', methods=['POST'])
def login_post():
    username = request.form.get('username')
    password = request.form.get('password')

    if username!='user' or password!='password':
        flash('Please check your login details and try again.')
        return redirect(url_for('login'))

    return redirect(url_for('profile'))

@main.route('/profile')
def profile():
    return render_template('profile.html')

@main.route('/update')
def update():
    return render_template('update.html')

@main.route('/update', methods=['POST'])
def update_post():
    global user, tdata
    user = request.form.get('username')

    try:
        tdata=pd.read_excel(user)

    except FileNotFoundError:
        flash("invalid file try again!!")
        return redirect(url_for('update'))

    else:
        return redirect(url_for('profile'))

@main.route('/successfull')
def successfull():
    return render_template('successfull.html')

@main.route('/successfull',methods=['POST'])
def successfull_post():
    return redirect(url_for('options'))

@main.route('/logout')
def logout():
    return redirect(url_for('index'))

@main.route('/options')
def options():
    return render_template('options.html')

@main.route('/lalo',methods=['POST'])
def lalo_post():
    global data,latitude,longitude
    la=request.form.get('latitude')
    lo=request.form.get('longitude')
    latitude=float(la)
    longitude=float(lo)

    try:
        data=tdata.loc[(tdata['Latitude'] == latitude) & (tdata['Longitude'] == longitude)]

    except NameError:
        flash("no excel sheet updated!!")
        return redirect(url_for("update"))

    else:
        return redirect(url_for("details"))

@main.route('/details')
def details():
    return render_template('details.html',latitude=latitude,longitude=longitude,tables=[data.to_html(classes='data')], titles=data.columns.values)

@main.route('/daty',methods=['POST'])
def daty_post():

    start_date = request.form.get('start_date')
    end_date = request.form.get('end_date')
    ctype=request.form.get('ctype')

    try:
        data=tdata.loc[(tdata['Event Type'] == ctype)&((tdata['Create Date/Time'] > start_date) & (tdata['Create Date/Time'] <= end_date))]  

    except NameError:
        flash("no excel sheet updated!!")
        return redirect(url_for("update"))

    else:
        latcol=data["Latitude"]
        longcol=data["Longitude"]
        maxLat=latcol.max() 
        minLat=latcol.min() 
        maxLong=longcol.max() 
        minLong=longcol.min() 
        plt.scatter(data['Longitude'],data['Latitude'])
        plt.ylim(minLat,maxLat)
        plt.xlim(minLong,maxLong)
        km=KMeans(n_clusters=3)
        y_predicted=km.fit_predict(data[['Longitude','Latitude']])
        data['cluster']=y_predicted
        data1=data[data.cluster==0]
        data2=data[data.cluster==1]
        data3=data[data.cluster==2]
        #data4=data[data.cluster==3]
        plt.scatter(data1['Longitude'],data1['Latitude'],color='green')
        plt.scatter(data2['Longitude'],data2['Latitude'],color='blue')
        plt.scatter(data3['Longitude'],data3['Latitude'],color='red')
        #plt.scatter(data4['Longitude'],data4['Latitude'],color='yellow')
        plt.xlabel('Longitude')
        plt.ylabel('Latitude')
        plt.legend(["Null","green", "blue","red"], loc ="lower right")
        plt.show()
        return redirect(url_for('profile'))



if __name__ == '__main__':
    main.run()
