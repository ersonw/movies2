@echo off
for %%i in (*) do  echo %%i

setlocal EnableDelayedExpansion
set "lj=%~p0"
set "lj=%lj:\= %"
for %%a in (%lj%) do set wjj=%%a
echo %%wjj
