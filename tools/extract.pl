#!/usr/bin/perl -nl
if(m|<script type="text/javascript" src="([^"]+)"></script>|) { print $1; }
