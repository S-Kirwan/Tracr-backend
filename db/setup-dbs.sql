DROP DATABASE IF EXISTS tracr;
CREATE DATABASE tracr;

DROP DATABASE IF EXISTS tracr_test;
CREATE DATABASE tracr_test;

\c tracr;
CREATE EXTENSION postgis;

\c tracr_test;
CREATE EXTENSION postgis;